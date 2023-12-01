import prisma from "../db"

export const getOrders = async (req, res) => {
  try {
    // You might want to implement pagination for large datasets
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;

    const orders = await prisma.order.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        createdAt: 'desc', // Adjust the sorting based on your requirements
      },
    });

    res.status(200).json({ data: orders, page, pageSize });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};



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



  export const deleteOrder = async (req, res) => {
    try {
      // Find the order to check if it's completed
      const order = await prisma.order.findUnique({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if the order is not completed
      if (!order.completed) {
        // Delete the order if not completed
        const deletedOrder = await prisma.order.delete({
          where: {
            id: req.params.id,
            userId: req.user.id,
          },
        });
  
        console.log('Order deleted successfully:', deletedOrder);
        res.status(200).json({ message: 'Order deleted successfully' });
      } else {
        // If the order is completed, return a 400 response
        res.status(400).json({ message: 'Completed orders cannot be deleted' });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  };
  



