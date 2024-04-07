import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isSuperAdmin } from "../../middlewares/isSuperAdmin"

const userRouter = express.Router()

userRouter.get("/",auth, isSuperAdmin, Controller.getUsers)
userRouter.get("/:username", Controller.getPublicProfile)
userRouter.put("/profile",auth, Controller.updateProfile)
userRouter.get("/posts/:userId", Controller.getUserPosts)


export default userRouter