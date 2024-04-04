import express, { Application } from "express"
import cors from 'cors'
import router from "./router"


export const app: Application = express()

app.use(cors())

app.use(express.json()) //para convertir a json los datos recibidos


app.get("/hello", (req, res) => {
  res.status(200).json({ success: true, msg: "server is ok" })
})

app.use('/api', router)