import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

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

export const protect = (req, res, next)=>{
    const bearer = req.headers.authorization;
    if(!bearer || !bearer.startsWith('Bearer ')){
        return res.status(401).json({message:'not authorized'}).end();
    }

    const [, token] = bearer.split(' ')
    if(!token){
        return res.status(401).json({message:'not authorized'}).end();
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    }catch(err){
        return res.status(401).json({message:'not authorized'}).end();
    }
}