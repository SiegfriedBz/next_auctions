"use client";

import { Trans } from "@lingui/react/macro";
import type {
  ComponentProps,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
} from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
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

export const UploadDialog: FC<PropsWithChildren<Props>> = (props) => {
  const {
    openUploadDialog,
    setOpenUploadDialog,
    onStartUpload,
    onRemoveFile,
    children,
    ...rest
  } = props;

  return (
    <AlertDialog
      {...rest}
      open={openUploadDialog}
      onOpenChange={setOpenUploadDialog}
    >
      <AlertDialogContent className="z-[9999] w-92">
        {children}
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
