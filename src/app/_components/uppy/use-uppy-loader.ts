import { useLingui } from "@lingui/react/macro";
import type Uppy from "@uppy/core";
import type { Meta, UppyFile } from "@uppy/core";
// import { Dashboard } from "@uppy/react";
import { useCallback, useEffect, useState } from "react";
import type { FieldValues, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

type UFile = UppyFile<Meta, Record<string, never>>;

type Params = {
  uppy: Uppy<Meta, Record<string, never>>;
  userId: string;
  fieldName: string; // RHF field name
  setValue: UseFormSetValue<FieldValues>;
  bucketName: string; // supabase bucket
};

export const useUppyLoader = (params: Params) => {
  const { uppy, userId, fieldName, setValue, bucketName } = params;

  const [openUploadDialog, setOpenUploadDialog] = useState<boolean>(false);
  const [startUpload, setStartUpload] = useState<boolean>(false);
  const [file, setFile] = useState<UFile | null>(null);
  const fileId = file?.id || null;

  const { t } = useLingui();

  const onRemoveFile = useCallback(() => {
    if (!fileId) return;

    uppy.removeFile(fileId);
    setFile(null);
  }, [uppy.removeFile, fileId]);

  const onConfirmAddFile = useCallback(async () => {
    if (!file) return;

    const supabase = createClient();
    try {
      const fileExt = file?.name?.split(".")?.pop();
      const filePath = `${userId}/avatar.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.data as File, {
          upsert: true,
        });

      if (error || !data) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      // update RHF field
      setValue(fieldName, publicUrl, { shouldValidate: true });

      toast.success(t`Image uploaded successfully!`);
      toast.info(t`Click on Update your profile`);
    } catch (err) {
      console.error(err);
      toast.error(t`Failed to upload image. Please try again.`);
      onRemoveFile();
    }
  }, [userId, fieldName, bucketName, setValue, file, onRemoveFile, t]);

  const onStartUpload = useCallback(() => {
    setStartUpload(true);
  }, []);

  useEffect(() => {
    uppy.on("file-added", (file: UFile) => {
      setFile(file);
      setOpenUploadDialog(true);
    });

    return () => uppy.clear();
  }, [uppy]);

  useEffect(() => {
    if (!startUpload || !file) return;

    (async () => {
      setOpenUploadDialog(false);
      toast.success(t`Uploading avatar...`);
      await onConfirmAddFile();
      setStartUpload(false);
    })();
  }, [startUpload, file, onConfirmAddFile, t]);

  return { openUploadDialog, setOpenUploadDialog, onStartUpload, onRemoveFile };
};
