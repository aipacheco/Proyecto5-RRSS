import { Request, Response } from "express"
import * as Repository from "./repository"
import { validateUser } from "./services"
import bcrypt from "bcrypt"

export const register = async (req: Request, res: Response) => {
  const userErrors = validateUser(req)

  const { requiredLength, isInvalidPassword, isInvalidEmail } = userErrors

  if (!requiredLength && !isInvalidPassword && !isInvalidEmail) {
    const { username, email, password } = req.body

    const passEncript: string = bcrypt.hashSync(password, 12)

    const newUser = {
      username: username,
      email: email,
      password: passEncript,
    }
    try {
      const { user, error } = await Repository.register(newUser)

      if (error) {
        return res.status(409).json({
          success: false,
          message: error,
        })
      }

      if (user) {
        //se crea para devolver el user sin password hasheado
        const userToReturn = {
          username: user.username,
          email: user.email,
        }

        return res.status(201).json({
          success: true,
          message: "User created",
          data: userToReturn,
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the user",
      })
    }
  }
}

export const login = () => {}
