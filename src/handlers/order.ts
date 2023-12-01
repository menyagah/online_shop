import prisma from "../db"


export const getOrders = async(req, res) => {
    const order = await prisma.order.findUnique({
        where: {
            id: req.user.id,
            completed:  true ?? false,
        },
        include: {
            product: true,
        }
    })

    res.json({data: order.product})

}

export const createOrder = async (req, res) => {
    try {
      const { userId, productId, completed } = req.body;
  
      // Create a new order
      const newOrder = await prisma.order.create({
        data: {
          userId: userId,
          completed: completed || false, // Default to false if not provided
          productId: productId,
        },
      });
  
      // Check if the order is completed before updating user products
      if (completed) {
        // Update the user's products
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            products: {
              connect: { id: productId},
            },
          },
        });
        if (productId) {
            await prisma.product.update({
                where: {
                    id: productId,
                },
                data: {
                    count: { increment: 1}
                },
            });
        }

        console.log('User products updated successfully');

      }
  
      res.status(201).json({ message: 'Order created successfully', newOrder });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  };



