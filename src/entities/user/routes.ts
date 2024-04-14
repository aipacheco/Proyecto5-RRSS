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
userRouter.put("/profile", auth,upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'banner', maxCount: 1 }, { name: 'description', maxCount: 1 }]), Controller.updateProfile)
userRouter.get("/posts/:userId", Controller.getUserPosts)
//ejemplo de uso con single file
// userRouter.put("/avatar",auth, upload.single("avatar"), Controller.updateAvatar)

export default userRouter
