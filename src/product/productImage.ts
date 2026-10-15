import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinary.upload.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const uploadProductImage = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "digital-shop/products"
    );

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  }
);