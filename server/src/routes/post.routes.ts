import { Router } from "express";
import { upload } from "../Services/MulterConfig";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createBlog, getblogs, publishBlog ,getblogsbyId, updateBlog, getmyblogs, deleteBlog} from "../controllers/post.controller";


const router=Router();
 
router.get('/',getblogs);
router.get('/myblogs',verifyJWT,getmyblogs)
router.post("/create",verifyJWT,upload.single("thumbnail"),createBlog);
router.put("/publish",verifyJWT,publishBlog);
router.get("/:id",verifyJWT,getblogsbyId);
router.put("/update",upload.single("thumbnail"),verifyJWT,updateBlog);
router.delete("/remove/:id",verifyJWT,deleteBlog);

export {router as postRouter}