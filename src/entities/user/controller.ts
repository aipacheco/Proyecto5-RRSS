import { Request, Response } from "express"
import * as Repository from "./repository"
import { UsernameRequiredLength } from "./services"

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

export const getMyProfile = async (req: Request, res: Response) => {
  const { userId } = req.tokenData
  try {
    const { user, error } = await Repository.getMyProfile(userId)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      })
    }
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Your profile",
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
