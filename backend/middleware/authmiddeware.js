import jwt from "jsonwebtoken";
import Usermodel from "../models/Usermodel";

export const authmiddleware  = async (req, res , next)=>{
    const token  = req.headers.authorization;
    const docoded  = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usermodel.findById(docoded.id);
    if(!user && !docoded.id){
        return res.status(401).json({message:"Unauthorized"});
    }
    req.user = user;
    next();

}