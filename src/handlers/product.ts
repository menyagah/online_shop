import prisma from "../db"


export const getProducts = async(req, res) => {
    const products = await prisma.product.findMany()
    res.json({data: {id: res.id,
        name: res.name,
        description: res.description,
        image: res.image,
        original_price: res.original_price,
        current_price: res.current_price,
        savings: res.savings,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
        }})
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

export const createProduct = async (req, res) => {
    try {
      
      const newProduct = await prisma.product.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
          quantity: parseInt(req.body.quantity),
          original_price: req.body.original_price,
          current_price: req.body.current_price,
          savings: req.body.savings,
        },
      });
  
      res.status(201).json({ data: newProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  };


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