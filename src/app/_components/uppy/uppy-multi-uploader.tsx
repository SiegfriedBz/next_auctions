"use client";

import { Dashboard } from "@uppy/react";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";
import "@uppy/image-editor/css/style.min.css";
import { Trans, useLingui } from "@lingui/react/macro";
import { CloudUploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AuctionCarousel } from "../auctions/auction-carousel";
import { useUppy } from "./hooks/use-uppy";
import { LoaderType, useUppyLoader } from "./hooks/use-uppy-loader";
import { SkeletonUppyDashboard } from "./skeleton-uppy-dashboard";
import { UploadDialog } from "./upload-dialog";

type Props = {
  storageId: string; // auction field pointing to supabase storage folder
  fieldName: string; // RHF field name
  bucketName: string; // supabase bucket
  maxNumberOfFiles?: number;
  maxFileSize?: number;
  infoMessage: string;
};

export const UppyMultiUploader = ({
  storageId,
  fieldName,
  bucketName,
  maxNumberOfFiles,
  maxFileSize,
  infoMessage,
}: Props) => {
  const [uppyIsReady, setUppyIsReady] = useState<boolean>(false);

  const { t } = useLingui();

  const { control, setValue } = useFormContext();

  const { uppy } = useUppy({ maxNumberOfFiles, maxFileSize });

  const {
    openUploadDialog,
    setOpenUploadDialog,
    onStartUpload,
    onRemoveFile,
    files,
  } = useUppyLoader({
    type: LoaderType.MULTI,
    storageId,
    uppy,
    fieldName,
    setValue,
    bucketName,
    successMessage: t`Images uploaded successfully!`,
    infoMessage,
    errorMessage: t`Failed to upload one or more images. Please try again.`,
  });

  useEffect(() => {
    if (!uppy) return;
    setUppyIsReady(true);
  }, [uppy]);

  return (
    <>
      <UploadDialog
        openUploadDialog={openUploadDialog}
        setOpenUploadDialog={setOpenUploadDialog}
        onStartUpload={onStartUpload}
        onRemoveFile={() => {
          for (const file of files) {
            onRemoveFile(file.id);
          }
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <CloudUploadIcon className="size-5" />
            <Trans>Upload images?</Trans>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Trans>
              Your images will be uploaded now, but it won't be saved until you
              create your auction.
            </Trans>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </UploadDialog>

      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <Label className="flex items-center gap-x-2">
                <CloudUploadIcon className="size-5" />
                <Trans>Upload up to 3 images</Trans>
              </Label>
            </CardHeader>

            {uppyIsReady ? (
              <CardContent className="flex flex-col items-center justify-center">
                <Dashboard
                  uppy={uppy}
                  theme="dark"
                  height={128}
                  width={224}
                  hideUploadButton
                  proudlyDisplayPoweredByUppy={false}
                />
                {field.value?.length ? (
                  <div className="mt-4 sm:mt-8 w-full">
                    {field.value && <AuctionCarousel urls={field.value} />}
                  </div>
                ) : null}
              </CardContent>
            ) : (
              <SkeletonUppyDashboard />
            )}
          </Card>
        )}
      />
    </>
  );
};
