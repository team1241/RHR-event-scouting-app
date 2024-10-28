"use server";
import { utapi } from "~/server/uploadthing";

export default async function utDeleteFilesByUrl({
  fileUrls,
}: {
  fileUrls: string[];
}) {
  const fileIds = fileUrls.map((fileUrl) =>
    fileUrl.replace("https://utfs.io/f/", "")
  );

  const deleteResult = await utapi.deleteFiles(fileIds);

  return deleteResult.success;
}
