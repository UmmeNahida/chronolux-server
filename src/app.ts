import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import httpStatus from "http-status-codes"
import { routes } from "./app/routes/routes";
const app = express()


app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin:["http://localhost:5173"]
}))


// route endpoint
app.use('/api/v1',routes)

app.get('/', (req, res) => {
  res.send('chonolux server is running!')
})

app.use((req:Request, res:Response)=>{
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message:"Page not fount"
  })
})




export default app;