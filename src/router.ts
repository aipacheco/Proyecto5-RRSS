import  {  Router } from "express"
import authRouter from "./entities/auth/routes"


const router = Router()

//rutas de auth
router.use("/auth", authRouter)


export default router