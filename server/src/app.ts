import express from "express"
import cookieParser from "cookie-parser";
import {userRouter,postRouter} from "./routes" 

const app=express();

 app.use(express.json());
 app.use(cookieParser());

 app.use("/api/v1/user",userRouter);
 app.use("/api/v1/blog",postRouter);
 

export default app;


