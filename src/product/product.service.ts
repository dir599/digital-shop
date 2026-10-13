import prisma from "../database/prisma";
import { CreateProductData, UpdateProductData } from "./product.validation";

import { ApiError } from "../utils/apiError";
import { RequestHandler } from "express";

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

const getProductByIdService = async (id: number) => {
  const existProduct = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!existProduct) {
    throw new ApiError(400, "Product not found");
  }
  const productById = await prisma.product.findMany({
    select: {
      name: true,
      description: true,
      price: true,
      image: true,
      category: true,
      stock: true,
    },
  });

  return productById;
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
  return updateProduct;
};

const deleteProductService = async (id: number) => {
  const existProduct = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  if (!existProduct) {
    throw new Error("Product doesn't exist");
  }

  const deleteProduct = await prisma.product.delete({
    where: {
      id: id,
    },
  });

  return deleteProduct;
};

export {
  productService,
  getProductService,
  updateProductService,
  getProductByIdService,
  deleteProductService,
};
