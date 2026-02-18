import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI || 3000);
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
        
    }
}


export default connectDb;
