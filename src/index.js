import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.error(`Error: ${error}`)
        throw error
    })
    const runningPort = process.env.PORT || 8000
    app.listen(runningPort, () => {
        console.log(`Server is running on Port: ${runningPort}`)
    })
})
.catch((error) => {
    console.error(`MongoDB connection Failed !!!`, error);
})