import { Request, Response } from "express"
import * as Repository from "./repository"
import { UsernameRequiredLength } from "./services"
import { v2 as cloudinary } from "cloudinary"

export const getUsers = async (req: Request, res: Response) => {
  const email = req.query.email as string

  if (email) {
    try {
      const { error, data } = await Repository.getUserByEmail(email)

      if (data) {
        return res.status(200).json({
          success: true,
          message: "User by email",
          data: data,
        })
      }
      if (error) {
        return res.status(404).json({
          success: true,
          message: "User not found",
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      })
    }
  } else {
    try {
      const { user, error } = await Repository.getUsers()
      if (error) {
        return res.status(400).json({
          success: false,
          message: error,
        })
      }
      if (user) {
        return res.status(201).json({
          success: true,
          message: "All users",
          data: user,
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      })
    }
  }
}

export const getPublicProfile = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const { user, error } = await Repository.getPublicProfile(username)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      })
    }
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Perfil",
        data: user,
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  const { username } = req.body
  const { userId } = req.tokenData

  try {
    const existingUsername = await Repository.findUsername(userId)

    // Verificar si los campos no han cambiado
    if (existingUsername === username) {
      return res.status(400).json({
        success: false,
        message: "No changes detected. Your username was not updated",
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    })
  }

  const { error, success } = UsernameRequiredLength(username, 8, 25)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    })
  }
  if (success) {
    try {
      const { updated, error } = await Repository.updateProfile(
        userId,
        username
      )

      if (error) {
        return res.status(400).json({
          success: false,
          message: error,
        })
      }
      if (updated) {
        return res.status(201).json({
          success: true,
          message: "Your profile was updated",
          data: updated,
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      })
    }
  }
}

export const getUserPosts = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const { post, error } = await Repository.getUserPosts(userId)

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      })
    }

    if (post) {
      return res.status(201).json({
        success: true,
        message: "Posts by user",
        data: post,
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    })
  }
}

export const updateBanner = async (req: Request, res: Response) => {

  const { userId } = req.tokenData
  try {
    console.log("hola", req.file)
    if (!req.file) {
      return res.status(400).send("No file uploaded.")
    }
    // crea una promesa de upload_stream de Cloudinary
    const result: any = await new Promise((resolve, reject) => {
      // Crea un stream de carga a Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "H8ter",
        },
        (error, result) => {
          if (error) {
            reject(error) // si hay un error, rechaza la promesa
          } else {
            resolve(result) // si todo va bien, resuelve la promesa con el resultado
          }
        }
      )
      // envia el buffer del archivo a Cloudinary
      uploadStream.end(req.file!.buffer)
    })
    // la URL de la imagen estará en el campo 'secure_url'
    const imageUrl = result.secure_url
    // console.log(imageUrl)

    const { updated } = await Repository.updateBanner(userId, imageUrl)

    if (updated) {
      return res.status(200).json({
        success: true,
        message: "Posts by user",
        data: updated,
      })
    }
  } catch (error) {
    console.error("el error:", error)
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" })
  }
}
