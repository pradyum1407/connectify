import jwt from "jsonwebtoken"
import User from "../Models/User.js"


export const protectedRoute = async (req, res, next) => {
    try {
       
      const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "unauthorized : no token provided" })
        }


        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decode) {
            return res.status(401).json({ message: "Unauthorized :invalid token" })
        }

        const user =  await  User.findById(decode.userId).select("-password");

        if(!user){
            return res.status(401).json({message:"Unauthorized :no user found "})
        }

        req.user = user;


        next();

    } catch (error) {
console.log("error in the protectedroute middleware",error);
res.status(500).json({ message: "Internal Server Error" });
    }
}