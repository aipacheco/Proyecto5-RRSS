import  {  Router } from "express"
import authRouter from "./entities/auth/routes"
import userRouter from "./entities/user/routes"


const router = Router()

//rutas de auth
router.use("/auth", authRouter)
router.use("/users", userRouter)


export default router