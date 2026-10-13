import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { productSchema, updateProductSchema } from "./product.validation";
import {
  deleteProductService,
  getProductByIdService,
  getProductService,
  productService,
  updateProductService,
} from "./product.service";
import { ApiError } from "../utils/apiError";


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

const getProductByIdController = asyncHandler(async(req: Request, res: Response)=>{
    const id = Number(req.params.id)
    if(!Number.isInteger(id || id <=0)){
      throw new ApiError(400, "Product not found")
    }
    const productById = await getProductByIdService(id)
    return res.status(200).json({
      success: true,
      message: "Product get by Id.",
      data: productById
    })
})

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
export { productController, getProductController,getProductByIdController, updateProductController, deleteProductController };
