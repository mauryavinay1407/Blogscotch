import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { createBlogSchema } from "../utils/zodformats";

const prisma=new PrismaClient();

interface CustomRequest extends Request {
    userId: string;  
}
export const getblogs=asyncHandler(async(req:Request,res:Response)=>{
    const blogs=await prisma.post.findMany();
    res.status(200).json(blogs);
})

export const createBlog=asyncHandler(async(req:CustomRequest,res:Response)=>{
   try {
     const {title,content,category}=req.body;
     const file=req.file?.filename;
 
     const Obj=createBlogSchema.safeParse(req.body);
 
     if(!Obj.success){
         return res.status(401).json({
             message:"Incorrect input format"
         })
     }
     const blog=await prisma.post.create({
         data:{
             title,
             content,
             category,
             thumbnail:file!,
             authorId:req.userId
         }
     })
    
      await prisma.user.update({
        where:{
            id:req.userId
        },
        data:{
            posts:{
               connect:{
                id:blog.id
               }
            }
        },
        include:{
            posts:true
        }
     })
     res.status(200).json({
         message:"Blog created successfully",
         blog
     })
   } catch (error:any) {
      console.log(error)
      throw new Error("Blog is not created,an error occured")
   }
})

export const getmyblogs=asyncHandler(async(req:CustomRequest,res:Response)=>{
   try {
     const user=await prisma.user.findUnique({
         where:{
             id:req.userId
         },
         include:{
             posts:true
         }
     })

     res.status(200).json(user!.posts)

   } catch (error:any) {
    console.log(error);
   }
})


export const publishBlog=asyncHandler(async(req:Request,res:Response)=>{
  try {
      const {isPublished,postId}=req.body;
      const blog=await prisma.post.update({
          where:{
              id:postId
          },
          data:{
              published: !(!isPublished),
              updatedAt: new Date()
            }
        })
        res.status(200).json({
            message:"Your blog is published successfully"
        })
    } catch (error:any) {
        console.log(error)
        throw new Error("Blog is not published,an error occured")
    }
})

export const getblogsbyId=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const blogid=req.params.id;
        
        const blog=await prisma.post.findUnique({
            where:{
                id:blogid
            }
        })
        res.status(200).json(blog);
   } catch (error:any) {
       console.log("An error occured while get blog by id");
    throw new Error("Can't find blog with this id");
   }
})

export const updateBlog=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {title,content,category,postId}=req.body;
        if (!title || !content || !category || !postId) {
            return res.status(400).json({ message: "Missing required parameters" });
        }
        
        const file=req.file?.filename;
        
        await prisma.post.update({
            where:{
                id:postId
            },
            data:{
                title:title,
                content:content,
                category:category,
                thumbnail:file,
                updatedAt: new Date()
            }
        })
        res.status(200).json({
            message:"Blog updated successfully!"
        })
    
} catch (error:any) {
    console.log("An error occuered while updating blog");
    throw new Error("An error occured ,blog didn't updated successfully");
}
})

export const deleteBlog=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const blogId=req.params.id;

        const result=await prisma.post.delete({
            where:{
                id:blogId
            }
        })
        console.log(result);
        res.status(200).json({
            message:"Post is deleted successfully!"
        })
    } catch (error:any) {
        console.log("An error occured while deleting post");
        throw new Error("Post has not deleted successfully");
    }
})