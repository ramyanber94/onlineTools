"use client";

import { Button, FileInput, Label } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import jsPDF from "jspdf";

export default function ImagesToPdf() {
  const [images, setImages] = useState<string[]>([]);

  const handleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event?.target?.files || []);
    const images = files.map((file) => URL.createObjectURL(file));
    setImages(images);
  };

  const handleImagesToPdf = () => {
    const pdf = new jsPDF();
    images.forEach((image) => {
      pdf.addImage(image, "JPEG", 0, 0, 210, 297);
    });
    const uuid = Math.random().toString(36).substring(7);
    pdf.save(`${uuid}.pdf`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-between mb-4 gap-3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {images.length === 0
            ? [...Array(3)].map((_, index) => (
                <div
                  className="h-52 w-52 rounded-lg bg-gray-200 col-span-1 dark:bg-gray-800"
                  key={index}
                />
              ))
            : images.map((image, index) => (
                <div
                  className="h-52 w-52 rounded-lg bg-gray-200 col-span-1 dark:bg-gray-800"
                  key={image}
                >
                  <Image
                    src={image}
                    alt={`image-${index}`}
                    className="h-full w-full object-contain rounded-lg"
                    width={800}
                    height={400}
                  />
                </div>
              ))}
        </div>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-52 w-[65%] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <FileInput
              id="dropzone-file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImagesUpload}
            />
          </Label>
        </div>

        <div className="flex w-full items-center justify-center">
          <Button onClick={handleImagesToPdf} className="w-[65%]">
            Convert to PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
