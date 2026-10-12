import { number } from "zod";
import prisma from "../database/prisma";
import { CreateProductData, UpdateProductData } from "./product.validation";
import id from "zod/v4/locales/id.js";
import tr from "zod/v4/locales/tr.js";

const productService = async (data: CreateProductData) => {
  try {
    const { name, description, price, category, stock, image } = data;
    const createProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        stock,
        image,
      },
    });
    return createProduct;
  } catch (error) {
    console.log("Prisma product creation error:", error);
    throw error;
  }
};

const getProductService = async () => {
  // const {name, description, stock, price, image, category} = data
  const products = await prisma.product.findMany({
    select: {
      name: true,
      description: true,
      stock: true,
      price: true,
      category: true,
    },
  });
  return products;
};

const updateProductService = async (id: number, data: UpdateProductData) => {
  const existProduct = await prisma.product.findUnique({
    where: { id },
  });
  if (!existProduct) {
    throw new Error("Product not found");
  }
  const updateProduct = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data,
  });
  return updateProduct
};

const deleteProductService = async(id: number)=>{
  const existProduct = await prisma.product.findUnique({
    where:{
      id: id
    }
  })
  if(!existProduct){
    throw new Error("Product doesn't exist")
  }

  const deleteProduct = await prisma.product.delete({
    where: {
      id: id
    }
  })

  return deleteProduct
}

export { productService, getProductService, updateProductService, deleteProductService };
