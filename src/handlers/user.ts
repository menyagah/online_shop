import prisma from "../db";
import { comparePassword, createJwt, hashPassword } from "../modules/auth";



export const createNewUser = async (req, res) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                phone: req.body.phone,
            },
        });

        if (existingUser) {
            // Phone number already exists
            res.status(409).json({ message: 'Phone number already in use' });
            return;
        }

        const hashedPassword = await hashPassword(req.body.password);

        const newUser = await prisma.user.create({
            data: {
                phone: req.body.phone,
                name: req.body.name,
                password: hashedPassword,
            },
        });

        const token = createJwt(newUser);
        res.json({ token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
};

export const signin = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                phone: req.body.phone,
            },
        });

        if (!user) {
            // User not found
            res.status(401).json({ message: 'Phone or password mismatch' });
            return;
        }

        const isValid = await comparePassword(req.body.password, user.password);
        if (!isValid) {
            // Password mismatch
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
