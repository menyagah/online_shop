import prisma from "../db"


export const getProducts = async(req, res) => {
    const products = await prisma.product.findMany()
    res.json({data: products})
}


export const getOneProduct = async(req, res) => {
    const productId = req.params.id

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    res.json({data: product})
}

export const createProduct = async(req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            count: req.body.count,
            original_price: req.body.original_price,
            current_price: req.body.current_price,
            savings: req.body.savings
        }
    })
    res.json({data: product})
}


export const updateProduct = async (req, res) => {
    const productUpdate = await prisma.product.update({
        where: {
            id: req.params.id,
        },
        data: {
            current_price: req.body.original_price,
            savings: req.body.savings
        }
        
    })
    res.json({data: productUpdate})
}


export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    })

    res.json({data: deleted})
}