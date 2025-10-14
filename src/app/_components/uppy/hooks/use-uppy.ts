import Uppy from "@uppy/core";
import { useState } from "react";

type Params = {
  maxNumberOfFiles?: number;
  maxFileSize?: number;
};

export const useUppy = (params: Params = {}) => {
  const { maxNumberOfFiles = 1, maxFileSize = 5 * 1024 * 1024 } = params;

  const [uppy] = useState(
    () =>
      new Uppy({
        restrictions: {
          maxNumberOfFiles,
          maxFileSize,
          allowedFileTypes: ["image/*"],
        },
        autoProceed: true,
      }),
  );

  return { uppy };
};
