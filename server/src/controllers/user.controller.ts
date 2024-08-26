import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler";
import { Request,Response } from "express";
import { signupSchema,loginSchema} from "../utils/zodformats";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

interface CustomRequest extends Request{
   userId:string
}


const prisma=new PrismaClient();

export const signupUser=asyncHandler(async(req:Request,res:Response)=>{
   try {
      const {name,email,password}= req.body;
      const file=req.file?.filename;

      const Obj=signupSchema.safeParse(req.body);
 
      if(!Obj.success){
         return res.status(401).json({
             message:'Incorrect inputs'
         })
      }
      const user = await prisma.user.findUnique({
 		where: {
 			email: email
 		}
 	});
     if(user){
        return res.status(401).json({
         message:"User already exixts"
        })
     }
      const hashedPassword=await bcrypt.hash(password,10);
 
      const savedUser=await prisma.user.create({
         data: {
             email,
             name,
             password:hashedPassword,
             profile:file!
         }
      })   
 
      const payload={
         userId:savedUser.id,
         username:savedUser.name
      }
     
      const token=await jwt.sign(payload,process.env.SECRET_KEY!);
 
      const options={
         expire: new Date(Date.now()+1 * 24 * 60 * 60 * 1000),
         httpOnly:true,
         secure:true
      }
 
      res.cookie("token",token,options)
      res.status(200).json({
         msg:"User created successfully",
      })

   } catch (error:any) {
      console.log("Error while creating user")
      throw new Error(error)
   }
    
})

export const signinUser=asyncHandler(async(req:Request,res:Response)=>{
   try {
      const {success}=loginSchema.safeParse(req.body)
      
      if(!success){
          return res.status(411).json({
              message:"Incorrect inputs"
          })
      }

      const user=await prisma.user.findUnique({
         where:{
            email:req.body.email
         }
      })

      if(!user)
      return res.json({
      message:"User doesn't exist"
      })

    const hashedPassword=await bcrypt.compare(req.body.password,user.password);
    if(!hashedPassword)
    return res.status(401).json({
     message:"You've entered wrong password!!!"
  })

  const payload={
      userId:user.id,
      username:user.name
  }

   const token=await jwt.sign(payload,process.env.SECRET_KEY!);

   const options={
      expire: new Date(Date.now()+1 * 24 * 60 * 60 * 1000),
      httpOnly:true,
      secure:true
   }

   res.cookie("token",token,options);
   res.status(200).json({
      msg:"Signin successfully",

   })
  
  } catch (error:any) {
      console.log("Login failed!!!")
      throw new Error(error);
    }
})

export const logoutUser=asyncHandler(async(req:Request,res:Response)=>{
    const options={
      httpOnly:true,
      secure:true
    }
    res.status(200).clearCookie("token",options).json({
      message:"User Logged out successfullyy"
    })

})

export const updateUser=asyncHandler(async(req:CustomRequest,res:Response)=>{
 try {
     const {name,password}=req.body;
  
     if(!(name && password))
        return res.status(401).json({Error:"Incomplete inputs!!!"});
  
     const file=req.file?.filename;
  
     const hashedPassword=await bcrypt.hash(password,10);
  
     const updatedUser=await prisma.user.update({
        where:{
           id:req.userId
        },
        data:{
           name,
           password:hashedPassword,
           profile:file
        }
     })
     
     res.status(200).json({
      message:"User profile updated successfully!"
     });
 } catch (error:any) {
      console.log("Error occured while updating user ",error);
      throw new Error("User profile is not updated!!!");
 }

})
