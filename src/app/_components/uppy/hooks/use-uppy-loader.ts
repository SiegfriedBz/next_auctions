import { useLingui } from "@lingui/react/macro";
import type Uppy from "@uppy/core";
import type { Meta, UppyFile } from "@uppy/core";
import { useCallback, useEffect, useState } from "react";
import type { FieldValues, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

export enum LoaderType {
  SINGLE = "SINGLE",
  MULTI = "MULTI",
}

type LoaderParams =
  | {
      type: LoaderType.SINGLE;
      userId: string;
      storageId?: never;
    }
  | {
      type: LoaderType.MULTI;
      storageId: string;
      userId?: never;
    };

type Params = {
  uppy: Uppy<Meta, Record<string, never>>;
  fieldName: string; // RHF field name
  setValue: UseFormSetValue<FieldValues>;
  bucketName: string; // supabase bucket
  successMessage: string;
  infoMessage: string;
  errorMessage: string;
} & LoaderParams;

type UFile = UppyFile<Meta, Record<string, never>>;

export const useUppyLoader = (params: Params) => {
  const {
    type,
    userId,
    storageId,
    uppy,
    fieldName,
    setValue,
    bucketName,
    successMessage,
    infoMessage,
    errorMessage,
  } = params;

  const [openUploadDialog, setOpenUploadDialog] = useState<boolean>(false);
  const [startUpload, setStartUpload] = useState<boolean>(false);
  const [files, setFiles] = useState<UFile[]>([]);

  const { t } = useLingui();

  const onRemoveFile = useCallback(
    (fileId?: string) => {
      if (type === LoaderType.SINGLE) {
        files[0] && uppy.removeFile(files[0].id);
        setFiles([]);
      } else if (type === LoaderType.MULTI) {
        if (fileId) {
          uppy.removeFile(fileId);
          setFiles((prev) => prev.filter((f) => f.id !== fileId));
        } else if (files.length) {
          files.forEach((f) => {
            uppy.removeFile(f.id);
          });
          setFiles([]);
        }
      }
    },
    [uppy.removeFile, files, type],
  );

  const onConfirmAddFile = useCallback(async () => {
    if (!files.length) return;

    const supabase = createClient();
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const fileName = file.name;
        if (!fileName || !file.data) {
          continue;
        }

        const filePath =
          type === LoaderType.SINGLE
            ? `${userId}/avatar.${fileName?.split(".")?.pop()}`
            : `${storageId}/${fileName}`;

        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file.data as File, {
            upsert: true,
          });

        if (error || !data) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      // update RHF field
      const fieldValue =
        type === LoaderType.SINGLE ? uploadedUrls[0] : uploadedUrls;

      setValue(fieldName, fieldValue, { shouldValidate: true });

      successMessage && toast.success(successMessage);
      infoMessage && toast.info(infoMessage);
    } catch (err) {
      console.error(err);
      errorMessage && toast.error(errorMessage);
      onRemoveFile();
    }
  }, [
    type,
    userId,
    storageId,
    fieldName,
    bucketName,
    setValue,
    files,
    onRemoveFile,
    successMessage,
    infoMessage,
    errorMessage,
  ]);

  const onStartUpload = useCallback(() => {
    setStartUpload(true);
  }, []);

  useEffect(() => {
    uppy.on("file-added", (file: UFile) => {
      setFiles((prev) => [...prev, file]);
      setOpenUploadDialog(true);
    });

    return () => uppy.clear();
  }, [uppy]);

  useEffect(() => {
    if (!startUpload || !files.length) return;

    (async () => {
      setOpenUploadDialog(false);
      toast.success(t`Uploading image...`);
      await onConfirmAddFile();
      setStartUpload(false);
    })();
  }, [startUpload, files, onConfirmAddFile, t]);

  return {
    files,
    openUploadDialog,
    setOpenUploadDialog,
    onStartUpload,
    onRemoveFile,
  };
};
