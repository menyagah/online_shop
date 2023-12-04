import prisma from "../db";
import { comparePassword, hashPassword, createRandomSessionId } from "../modules/auth";

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

        // Create a new session for the user
        const session = await prisma.session.create({
            data: {
                sessionId: createRandomSessionId(), // You need to implement createRandomSessionId function
                userId: newUser.id,
            },
        });

        res.json({ sessionId: session.sessionId });
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

        // Create a new session for the user
        const session = await prisma.session.create({
            data: {
                sessionId: createRandomSessionId(), // You need to implement createRandomSessionId function
                userId: user.id,
            },
        });

        res.json({ sessionId: session.sessionId });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
};


