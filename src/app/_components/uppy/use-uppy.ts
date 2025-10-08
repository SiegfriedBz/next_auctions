import Uppy from "@uppy/core";
import { useState } from "react";

type Params = {
  maxFileSize?: number;
};

export const useUppy = (params: Params = {}) => {
  const { maxFileSize = 5 * 1024 * 1024 } = params;

  const [uppy] = useState(
    () =>
      new Uppy({
        restrictions: {
          maxNumberOfFiles: 1,
          maxFileSize,
          allowedFileTypes: ["image/*"],
        },
        autoProceed: true,
      }),
  );

  return { uppy };
};
