import prisma from "../db"


export const getProducts = async(req, res) => {
    const product = await prisma.product.findMany()

}

