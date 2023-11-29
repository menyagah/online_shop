import prisma from "../db";
import { comparePassword, createJwt, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            phone: req.body.phone,
            name: req.body.name,
            password: await hashPassword(req.body.password)
        }
    })
    const token = createJwt(user);
    res.json({ token });
};


export const signin = async(req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            phone: req.body.phone
        }
    })

    const isValid = await comparePassword(req.body.password, user.password)
    if (!isValid) {
        res.status(401)
        res.json({message: 'phone or password mismatch'})
        return
    }

    const token = createJwt(user)
    res.json({token})
}
