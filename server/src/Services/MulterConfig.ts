import multer from "multer";
import { Request } from "express";


const storage=multer.diskStorage({
    destination:(req:Request,file:Express.Multer.File,callback)=>{
        callback(null,"./src/uploads")
    },
    filename:(req:Request,file:Express.Multer.File,callback)=>{
        const filename=`img-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
});

const filefilter=(req:Request,file:Express.Multer.File,callback:any)=>{
    if(file.mimetype==="image/png" || file.mimetype==="image/jpg"||file.mimetype==="image/jpeg")
        callback(null,true)
    else{
        callback(null,false)
        return callback(new Error("Only .png .jpg & .jpeg formatted allowed"))
    }
}

export const upload=multer({
    storage:storage,
    fileFilter:filefilter
});


