import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI );
        console.log("mongodb connected")
    } catch (error) {
        console.log(error);
        process.exit(1);
        
        
    }
}


export default connectDb;
