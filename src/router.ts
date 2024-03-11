import  {  Router } from "express"
import authRouter from "./entities/auth/routes"
import userRouter from "./entities/user/routes"
import postRouter from "./entities/post/routes"


const router = Router()

//rutas de auth
router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/posts", postRouter)



export default router