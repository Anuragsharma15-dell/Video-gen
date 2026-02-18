import express from "express"
const app = express();
import connectDb from "./db/db";


app.use(express.json());
app.use(cors());

connectDb();










app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000")
})
