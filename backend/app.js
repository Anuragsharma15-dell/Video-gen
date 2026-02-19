
import dotenv from "dotenv"
dotenv.config();
import express from "express"
const app = express();
import connectDb from "./db/db.js";
import cors from "cors"
import router from "../routes/route.js"


app.use(express.json());
app.use(cors());

connectDb();


app.use("/api", router);
app.get("/", (req, res) => {
    res.send("Hello World")
})









app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
