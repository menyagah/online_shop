import jwt from 'jsonwebtoken';

export const createJwt = (user) => {
  const token = jwt.sign({ 
        id: user.id, 
        phone: user.phone 
    }, 
    process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
        });
    return token;
};

export const protect = (req, res)=>{
    const bearer = req.headers.authorization;
    if(!bearer || !bearer.startsWith('Bearer ')){
        return res.status(401).json('not authorized').end();
    }
}