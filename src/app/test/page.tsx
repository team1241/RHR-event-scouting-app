"use client";
import React from "react";
import { UploadButton } from "~/lib/uploadthing";

export default function TestPage() {
  return (
    <div>
      <UploadButton endpoint="imageUploader" />
    </div>
  );
}
