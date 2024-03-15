import mongoose from "mongoose"
import { faker } from "@faker-js/faker"
import User from "../entities/user/model"
import Post from "../entities/post/model"
import "dotenv/config"
import { dbConnection } from "./db"
import bcrypt from "bcrypt"

dbConnection()

const createSeedData = async () => {
  try {
    // Eliminar datos existentes
    await User.deleteMany({})
    await Post.deleteMany({})
    
      //crear un super_admin
      const superAdmin = new User({
        username: "superAdmin",
        email: "superadmin@superadmin.com",
        password: bcrypt.hashSync("123456789", 12),
        role: "super_admin",
      })
      await superAdmin.save()
    // Crear 20 usuarios
    const userPromises = Array.from({ length: 20 }, async () => {
      const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("123456789", 12),
      })
      await user.save()


      // Para cada usuario, crear 10 posts
      const postPromises = Array.from({ length: 10 }, () => {
        const post = new Post({
          author: user._id,
          content: faker.lorem.paragraphs(),
          publishedAt: faker.date.past(),
        })
        return post.save()
      })

      await Promise.all(postPromises) // Esperar a que todos los posts de este usuario se guarden
      return user
    })

    // Esperar a que todos los usuarios y sus posts sean creados
    await Promise.all(userPromises)

    console.log("Seeder completado exitosamente")
  } catch (error) {
    console.error("Error al generar datos de prueba:", error)
  } finally {
    mongoose.disconnect()
  }
}
createSeedData()
