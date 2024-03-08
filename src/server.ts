import dotenv from "dotenv"
dotenv.config()

import { app } from "./app"
import { dbConnection } from "./database/db"

const PORT = process.env.PORT || 4001

dbConnection()
  .then(() => {
    console.log("Database connected")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })