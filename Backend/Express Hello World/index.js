import express from "express"
import cors from "cors"
import router from "./src/routes/register.js"
import mongoose from "mongoose"
import 'dotenv/config'
const app = express()


app.use(cors())



app.use(express.json());

app.use('/', router);



const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`mongodb+srv://SyalaniHackthon:ahsan@cluster0.jvalloi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
        console.log('not conected');
    }


}

connectDB().then(() => {
    app.listen(`${process.env.VITE_PORT}`, () => {
        console.log(`Example app listening on port ${process.env.VITE_PORT}`)
    })
}).catch((error) => {
    console.log(error);
})

