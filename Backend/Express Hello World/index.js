import express from "express"
import cors from "cors"
import router from "./src/routes/register.js"
import mongoose from "mongoose"
import 'dotenv/config'
const app = express()
const port = 3000

app.use(cors())

const dbName = 'ahuth'


app.use(express.json());

app.use('/', router);



const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.VITE_MONGURI}`)
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
    }


}

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}).catch((error) => {
    console.log(error);
})

