import prisma from "../database/prisma";
// import prisma from "../generated/prisma/client"

interface productData {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
}

const productService = async (data: productData) => {
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
};

export { productService };
