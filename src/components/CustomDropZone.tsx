"use client";
import Image from "next/image";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone, DropzoneRootProps, DropzoneInputProps, FileWithPath } from "react-dropzone";
import { Button } from "@material-tailwind/react";
import clsx from "clsx";

interface CustomDropZoneProps {
  className?: string;
  onFileChange?: (hasFile: boolean) => void;
  onUpload: (file: FileWithPath) => void; // Add an onUpload prop to handle the upload action
}

const CustomDropZone: React.FC<CustomDropZoneProps> = ({ className, onFileChange, onUpload }) => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Clean up the URL object
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (file) {
      onFileChange?.(true);
    } else {
      onFileChange?.(false);
    }
  }, [file, onFileChange]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
  };

  const handleUpload = () => {
    // Placeholder logic for file upload
    if (file) {
      console.log("Uploading file:", file);
      // Here you would typically make an API call to upload the file
      onUpload(file); // Call the onUpload prop function with the selected file
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 1000,
    maxFiles: 1,
  });

  return (
    <>
      <div
        {...getRootProps({
          className: clsx(
            "p-4 flex justify-center items-center border-2 border-neutrals-400 border-dashed cursor-pointer max-h-80",
            {
              "h-40": !file, // Specify a fixed height when no file is present
              "h-auto": file, // Use automatic height when file is present
            },
            className
          ),
        })}
      >
        <input {...getInputProps()} />
        {file && previewUrl ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={previewUrl}
              alt="Uploaded image"
              width={300} // These dimensions will maintain the aspect ratio
              height={169} // while letting the image be responsive
            />
            <p className="text-sm text-gray-600 mt-2">{file.name}</p>
            <Button
              onClick={(e) => removeFile(e)}
              fullWidth={false}
              className="max-w-40 bg-danger-400 lg:py-3"
              placeholder={undefined}
            >
              <p className="text-caption md:text-body2 font-bold text-white">Remove</p>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            {isDragActive ? (
              <p className="text-gray-500 text-center">Drop the image here ...</p>
            ) : (
              <p className="text-gray-500 text-center">
                Drag 'n' drop an image here, or click to select an image
              </p>
            )}
          </div>
        )}
      </div>
      {file && (
        <div className="w-full flex justify-center item-center mt-4">
          <Button
            fullWidth={false}
            className="max-w-40 bg-primary-500 lg:py-3"
            placeholder={undefined}
            onClick={handleUpload}
          >
            <p className="text-caption md:text-body2 font-bold text-white">Upload</p>
          </Button>
        </div>
      )}
    </>
  );
};

export default CustomDropZone;

/* {isDragActive ? (
  <p>Drop the files here ...</p>
) : (
  <p>Drag 'n' drop some files here, or click to select files</p>
)} */
