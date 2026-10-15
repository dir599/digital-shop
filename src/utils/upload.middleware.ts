import multer from "multer";
import { ApiError } from "./apiError";


const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return callback(
      new ApiError(400, "Only JPEG, PNG and WebP images are allowed")
    );
  }

  callback(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});