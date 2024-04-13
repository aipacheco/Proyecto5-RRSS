import { Request, Response } from "express"
import * as Repository from "./repository"
import { UsernameRequiredLength } from "./services"
import { v2 as cloudinary } from "cloudinary"
import { UploadApiResponse } from "cloudinary"

interface Files {
  banner?: Express.Multer.File[]
  avatar?: Express.Multer.File[]
}

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
        message: "Usuario no encontrado",
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

  const description  = req.body.description
  const { userId } = req.tokenData
  const uploadPromises: Record<string, Promise<any>> = {}
  try {
    // const uploadPromises: any[] = []
    const files = req.files as Files
    if (files) {
      Object.keys(files).forEach((key) => {
        const fileArray = files[key as keyof Files]
        if (fileArray && fileArray.length > 0) {
          const file = fileArray[0]
          uploadPromises[key] = new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "H8ter" },
              (error, result) => {
                if (error) reject(error)
                else resolve(result)
              }
            )
            uploadStream.end(file.buffer)
          })
        }
      })

      // Espera a que todas las promesas de carga se resuelvan
      const results = await Promise.all(Object.values(uploadPromises))
      const keys = Object.keys(uploadPromises)

      let avatar = ""
      let banner = ""

      if (results[keys.indexOf("avatar")]) {
        avatar = results[keys.indexOf("avatar")].secure_url
      }

      if (results[keys.indexOf("banner")]) {
        banner = results[keys.indexOf("banner")].secure_url
      }

      const { updated, error } = await Repository.updateProfile(
        userId,
        description,
        avatar,
        banner
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
    } else {
      const { updated, error } = await Repository.updateDescription(
        userId,
        description
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
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    })
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
