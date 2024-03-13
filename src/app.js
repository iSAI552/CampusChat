import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import commentRouter from './routes/comment.routes.js'
import voteRouter from './routes/vote.routes.js'



app.use("/api/v1/users", userRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/vote", voteRouter)

// http://localhost:8000/api/v1/

export { app }