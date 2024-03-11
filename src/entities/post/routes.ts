import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isSuperAdmin } from "../../middlewares/isSuperAdmin"

const postRouter = express.Router()

postRouter.post("/",auth, Controller.createPost)
postRouter.delete("/:id",auth, Controller.deletePost)



export default postRouter