"use client";

import { Dashboard } from "@uppy/react";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";
import "@uppy/image-editor/css/style.min.css";
import { Trans, useLingui } from "@lingui/react/macro";
import { CloudUploadIcon, SquareUserRoundIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUppy } from "./hooks/use-uppy";
import { LoaderType, useUppyLoader } from "./hooks/use-uppy-loader";
import { SkeletonUppyDashboard } from "./skeleton-uppy-dashboard";
import { UploadDialog } from "./upload-dialog";

type Props = {
  userId: string;
  fieldName: string; // RHF field name, e.g., "avatarUrl"
  bucketName: string; // supabase bucket
};

export const UppyAvatarUploader = ({
  userId,
  fieldName,
  bucketName,
}: Props) => {
  const [uppyIsReady, setUppyIsReady] = useState<boolean>(false);

  const { t } = useLingui();

  const { control, setValue } = useFormContext();

  const { uppy } = useUppy();

  const { openUploadDialog, setOpenUploadDialog, onStartUpload, onRemoveFile } =
    useUppyLoader({
      type: LoaderType.SINGLE,
      userId,
      uppy,
      fieldName,
      setValue,
      bucketName,
      successMessage: t`Avatar uploaded successfully!`,
      infoMessage: t`Click on Update your profile`,
      errorMessage: t`Failed to upload avatar. Please try again.`,
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
        onRemoveFile={onRemoveFile}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2 items-center">
            <CloudUploadIcon className="size-5" />
            <Trans>Upload your new avatar?</Trans>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Trans>
              Your image will be uploaded now, but it won't update your profile
              until you click “Update your profile”.
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
                <SquareUserRoundIcon className="size-5" />
                <Trans>Upload your avatar</Trans>
              </Label>
            </CardHeader>

            {uppyIsReady ? (
              <CardContent className="flex flex-col items-center justify-center px-4">
                <Dashboard
                  uppy={uppy}
                  theme="dark"
                  height={128}
                  width={224}
                  hideUploadButton
                  // showProgressDetails={true}
                  proudlyDisplayPoweredByUppy={false}
                />
                {field.value && (
                  <Image
                    width={128}
                    height={128}
                    src={`${field.value}?t=${Date.now()}`}
                    alt="Avatar preview"
                    className="w-44 h-44 rounded-lg object-cover mt-6"
                  />
                )}
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
