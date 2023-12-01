import prisma from "../db";
import { comparePassword, createJwt, hashPassword } from "../modules/auth";

// export const createNewUser = async (req, res) => {
//     const user = await prisma.user.create({
//         data: {
//             phone: req.body.phone,
//             name: req.body.name,
//             password: await hashPassword(req.body.password)
//         }
//     })
//     const token = createJwt(user);
//     res.json({ token });
// };


// export const signin = async(req, res) => {
//     const user = await prisma.user.findUnique({
//         where: {
//             phone: req.body.phone
//         }
//     })

//     const isValid = await comparePassword(req.body.password, user.password)
//     if (!isValid) {
//         res.status(401)
//         res.json({message: 'phone or password mismatch'})
//         return
//     }

//     const token = createJwt(user)
//     res.json({token})
// }

export const createNewUser = async (req, res) => {
    try {
      const { phone, name, password } = req.body;
  
      // Validate input data
      if (!phone || !name || !password) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }
  
      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.findUnique({
        where: {
          phone: phone,
        },
      });

  
      // Check if the user exists
      if (user.phone) {
        res.status(401).json({ message: 'Phone or password mismatch' });
        return;
      }
  
  
      await prisma.user.create({
        data: {
          phone: phone,
          name: name,
          password: hashedPassword,
        },
      });

      
  
      const token = createJwt(user);
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  };
  
  export const signin = async (req, res) => {
    try {
      const { phone, password } = req.body;
  
      // Validate input data
      if (!phone || !password) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }
  
      const user = await prisma.user.findUnique({
        where: {
          phone: phone,
        },
      });

  
      // Check if the user exists
      if (!user) {
        res.status(401).json({ message: 'Phone or password mismatch' });
        return;
      }
  
      // Use constant time comparison for password validation
      const isValid = await comparePassword(password, user.password);
  
      if (!isValid) {
        res.status(401).json({ message: 'Phone or password mismatch' });
        return;
      }
  
      const token = createJwt(user);
      res.json({ token });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  };