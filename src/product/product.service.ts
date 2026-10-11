import prisma from "../database/prisma"


interface product{
    name: string,
    price: number,
    description: string,
    

}
const productService = async()=>{
    const createProduct = await prisma.product.create({
        data: {
            name,
            description,

        }
    }) 

}