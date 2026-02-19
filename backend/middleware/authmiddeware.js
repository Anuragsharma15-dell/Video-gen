import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authmiddleware  = async (req, res , next)=>{
    const token  = req.headers.authorization;
    const docoded  = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(docoded.id);
    if(!user && !docoded.id){
        return res.status(401).json({message:"Unauthorized"});
    }
    req.user = user;
    next();

}