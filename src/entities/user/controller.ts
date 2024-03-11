import { Request, Response } from "express"
import * as Repository from "./repository"

export const getUsers = async (req: Request, res: Response) => {
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
      message: "User created",
      data: user,
    })
  }
}

export const getMyProfile = async (req: Request, res: Response) => {
  const { userId } = req.tokenData
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
}

export const updateProfile = async(req: Request, res: Response) =>{


const {username, email} = req.body
const { userId } = req.tokenData

//todo: validaciones para que si el campo que pasamos no cambia, no haga nada

//todo: validaciones de los campos

const {updated,error } = await Repository.updateProfile(userId, username, email)
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