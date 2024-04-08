import express from "express"
import * as Controller from "./controller"
import { auth } from "../../middlewares/auth"
import { isSuperAdmin } from "../../middlewares/isSuperAdmin"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const userRouter = express.Router()

userRouter.get("/", auth, isSuperAdmin, Controller.getUsers)
userRouter.get("/:username", Controller.getPublicProfile)
userRouter.put("/profile", auth, Controller.updateProfile)
userRouter.get("/posts/:userId", Controller.getUserPosts)
userRouter.put("/banner",auth,
  upload.single("banner"),
  Controller.updateBanner
)

export default userRouter
