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

// export const createOrder = async(req, res) => {
//     const order = await prisma.order.create({
//         data: {
//             completed: false,
//             userId: req.body.id,
//             product: req.body.id
//         }
//     })
//     res.json({data: order})
// }

// export const createOrder = async (req, res) => {
//     try {
//       const { userId, productId } = req.body; // Assuming userId and productIds are part of the request body
//       const newOrder = await prisma.order.create({
//         data: {
//           userId: userId,
//           completed: req.body.completed, // Assuming the order is not completed initially
//           productId: productId,
//         },
//       });
  
//       res.status(201).json({ message: 'Order created successfully', newOrder });
//     } catch (error) {
//       console.error('Error creating order:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     } finally {
//       await prisma.$disconnect();
//     }
//   };

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



// export const createOrder = async (req, res) => {
//     try {
//       const { userId, productId, completed } = req.body;
  
//       // Create a new order
//       const newOrder = await prisma.order.create({
//         data: {
//           userId: userId,
//           completed: completed || false,
//           productId: productId,
//         },
//       });
  
//       // Check if the order is completed before updating user products
//     if (completed) {
//         // Update the count using Prisma update method
//         await prisma.product.update({
//             where: {
//                 id: productId,
//                 userId: userId
//             },
//             data: {
//                 count: {
//                     increment: 1
//                 },
//             },
//         });

//         console.log('Product count updated successfully');
//     }
  
//       res.status(201).json({ message: 'Order created successfully', newOrder });
//     } catch (error) {
//       console.error('Error creating order:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     } finally {
//       await prisma.$disconnect();
//     }
//   };