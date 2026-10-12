import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  price: z.number().positive("Price must be greater than zero"),
  description: z.string().trim().min(1, "Description is required"),
  category: z.string().trim().min(1, "Category is required"),
  stock: z.number().int().min(1, "Stock cannot be negative"),
  image: z.string().optional(),
});
export type CreateProductData = z.infer<typeof productSchema>;

export const updateProductSchema = productSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field update is required",
  });

export type UpdateProductData = z.infer<typeof updateProductSchema>
