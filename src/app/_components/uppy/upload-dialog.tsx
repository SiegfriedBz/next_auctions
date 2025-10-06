"use client";

import { Trans } from "@lingui/react/macro";
import type { ComponentProps, Dispatch, FC, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = Omit<
  ComponentProps<typeof AlertDialog>,
  "open" | "onOpenChange"
> & {
  openUploadDialog: boolean;
  setOpenUploadDialog: Dispatch<SetStateAction<boolean>>;
  onStartUpload: () => void;
  onRemoveFile: () => void;
};

export const UploadDialog: FC<Props> = (props) => {
  const {
    openUploadDialog,
    setOpenUploadDialog,
    onStartUpload,
    onRemoveFile,
    ...rest
  } = props;

  return (
    <AlertDialog
      {...rest}
      open={openUploadDialog}
      onOpenChange={setOpenUploadDialog}
    >
      <AlertDialogContent className="z-[9999] w-92">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Trans>Upload your new avatar?</Trans>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Trans>
              Your image will be uploaded now, but it won't update your profile
              until you click “Update your profile”.
            </Trans>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onRemoveFile}>
            <Trans>Cancel</Trans>
          </AlertDialogCancel>
          <AlertDialogAction onClick={onStartUpload}>
            <Trans>Continue</Trans>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
