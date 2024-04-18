import express, { Application } from "express"
import router from "./router"


export const app: Application = express()

app.use(express.json())


app.get("/hello", (req, res) => {
  res.status(200).json({ success: true, msg: "server is running" })
})

app.use('/api', router)