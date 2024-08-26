import { asyncHandler } from "../utils/asyncHandler";
import jwt,{JwtPayload} from "jsonwebtoken"
import { Request,Response,NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

interface MyJwtPayload extends JwtPayload {
    userId: string;
    username:string
  }

export const verifyJWT = asyncHandler(async (req:Request, res:Response,next:NextFunction) => {
  try {
    const token = req.cookies.token;

    if(!token){
        throw new Error("Authorization token is missing");
    }
    
    const decodedtoken =<MyJwtPayload> jwt.verify(token, process.env.SECRET_KEY!);

    if(!decodedtoken){
        throw new Error("Unauthorized access");
    }
 
    const user = await prisma.user.findUnique({
        where:{
            id: decodedtoken.userId
        }
    });

    if (!user)
      res.status(403).json({
        error: "unauthorized access",
      });
     (req as any).userId=decodedtoken.userId
      next();
  } catch (error:any) {
    throw new Error(error);
  }
});



