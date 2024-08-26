import { Request,Response,NextFunction } from "express";

export const asyncHandler=(fun:any)=>async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await fun(req,res,next);
    } catch (error:any) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
    }
    
    