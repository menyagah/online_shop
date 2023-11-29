import prisma from "../db"


export const getOrders = async(req, res) => {
    const order = await prisma.order.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

}