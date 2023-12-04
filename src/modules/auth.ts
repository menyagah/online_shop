import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};


export const createRandomSessionId = () => {
    return uuidv4();
}

// Define the session duration in milliseconds (e.g., 15 minutes)
const SESSION_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export const protect = async (req, res, next) => {
  const sessionId = req.headers.authorization.split(' ')[1];

  if (!sessionId) {
    return res.status(401).json({ message: 'Not authorized' }).end();
  }

  try {
    const session = await prisma.session.findUnique({
      where: {
        sessionId,
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      return res.status(401).json({ message: 'Not authorized' }).end();
    }

    // Check for session expiration
    const currentTimestamp = new Date().getTime();
    const sessionExpirationTimestamp = new Date(session.createdAt).getTime() + SESSION_DURATION;

    if (currentTimestamp > sessionExpirationTimestamp) {
      // Session has expired
      return res.status(401).json({ message: 'Session expired' }).end();
    }

    // Update the session's updatedAt timestamp to prolong the session
    await prisma.session.update({
      where: {
        sessionId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    req.user = session.user;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Not authorized' }).end();
  }
};



