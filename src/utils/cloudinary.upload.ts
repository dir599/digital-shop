import { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "node:stream";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(
            new Error("Cloudinary upload returned no result")
          );
        }

        resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};