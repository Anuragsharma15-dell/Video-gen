import mongoose  from "mongoose";


const Usermodel = new mongoose.model({
    username:{
        type:String,
        required:true ,

    },
    email:{
        type:String,
        required:true ,
        unique:true,
    },
    password:{
        type:String,
        require:true ,
        unique:true ,

    },

},{timestamps:true});
export default Usermodel;

