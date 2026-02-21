import {userSchema } from "../zod.js"
import Usermodel from "../models/Usermodel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const hashPassword = async (password)=>{
await bcrypt.hash(password, 10);
}


export const registerUser= async (req, res)=>{
    try {
        const validateData  = await userSchema.parseAsync(req.body);;
        const hashedPassword = await hashPassword(validateData.password);
        validateData.password = hashedPassword;
        const user = await Usermodel.create(validateData);
        res.status(201).json({message:"User created successfully", user});
        return {
            status:201,
            message:"User created successfully",
            user:user,
        }
    } catch (error) {
        res.status(400).json({message:"Invalid data", error:error.errors});
        return
    }
}

export const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await Usermodel.findOne({email});
        if(!user){
            return {
                status:401,
                message:"Invalid email or password",
            }
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return {
                status:401,
                message:"Invalid email or password",
            }
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.status(200).json({message:"Login successful", token});
        return {
    }
    } catch (error) {
        res.status(400).json({message:"Invalid data", error:error.errors});
        return
    }
}

export const createuser  = async (req,res )=>{
    const User = new Usermodel.create({
        username: username,

    email: email,

    password: hashPassword


    })
    if(!User){
        return status(201).json({
            message:"User not found"
        })


    }
    if(User){
        return  {
            username: username,

    email: email,

    password: hashPassword

        }   


        
    }

}