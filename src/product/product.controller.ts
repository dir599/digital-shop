import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { productSchema, updateProductSchema } from "./product.validation";
import {
  deleteProductService,
  getProductService,
  productService,
  updateProductService,
} from "./product.service";
import { number, success } from "zod";
import da from "zod/v4/locales/da.js";

const productController = asyncHandler(async (req: Request, res: Response) => {
  const result = productSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
  const product = await productService(result.data);

  return res.status(201).json({
    success: true,
    message: "Product created successfully.",
    data: product,
  });
});

const getProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getProductService();
    return res.status(200).json({
      success: true,
      message: "All product get",
      data,
    });
  },
);

const updateProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id<=0) {
      throw new Error("Invalid id.");
    }
    const result = updateProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          fields: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    const product = await updateProductService(id, result.data);
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  },
);

const deleteProductController = asyncHandler(async(req: Request, res: Response)=>{
   const id = Number(req.params.id)
   const deleteProduct = await deleteProductService(id)
   return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: deleteProduct
   })
})
export { productController, getProductController, updateProductController, deleteProductController };
