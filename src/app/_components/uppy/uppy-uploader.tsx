"use client";

import { Dashboard } from "@uppy/react";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";
import "@uppy/image-editor/css/style.min.css";
import { Trans } from "@lingui/react/macro";
import { SquareUserRoundIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SkeletonUppyDashboard } from "./skeleton-uppy-dashboard";
import { UploadDialog } from "./upload-dialog";
import { useUppy } from "./use-uppy";
import { useUppyLoader } from "./use-uppy-loader";

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

  const { control, setValue } = useFormContext();

  const { uppy } = useUppy();
  const { openUploadDialog, setOpenUploadDialog, onStartUpload, onRemoveFile } =
    useUppyLoader({
      uppy,
      userId,
      fieldName,
      setValue,
      bucketName,
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
      />
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
              <CardContent className="flex max-[476px]:flex-col [476px]:flex-row gap-3 [476px]:gap-6 items-center justify-center px-4">
                <Dashboard
                  uppy={uppy}
                  theme="dark"
                  height={128}
                  width={224}
                  hideUploadButton
                  // showProgressDetails={true}
                  proudlyDisplayPoweredByUppy={false}
                  className="sm:ms-4"
                />
                {field.value != null && (
                  <Image
                    width={128}
                    height={128}
                    src={field.value}
                    alt="Avatar preview"
                    className="w-32 h-32 rounded-lg object-cover"
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
