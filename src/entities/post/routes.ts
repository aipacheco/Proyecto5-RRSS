import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isSuperAdmin } from "../../middlewares/isSuperAdmin"


const postRouter = express.Router()

postRouter.post("/",auth, Controller.createPost)
postRouter.delete("/:id",auth, Controller.deletePost)
postRouter.put("/like/:id", auth, Controller.likePost)
postRouter.put("/:id",auth, Controller.updatePost)
postRouter.get("/own",auth, Controller.getMyPosts)
postRouter.get("/",  Controller.getAllPosts)
postRouter.get("/:id", Controller.getPostById)



export default postRouter