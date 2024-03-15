import { Request, Response } from "express"
import * as Repository from "./repository"
import { validateUser } from "./services"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
  const userErrors = validateUser(req)

  const { requiredLength, isInvalidPassword, isInvalidEmail } = userErrors

  if (!requiredLength && !isInvalidPassword && !isInvalidEmail) {
    const { username, email, password } = req.body

    const passEncript: string = bcrypt.hashSync(password, 12)

    const newUser = {
      username,
      email,
      password: passEncript,
    }
    try {
      const { user, error } = await Repository.register(newUser)

      if (error) {
        return res.status(400).json({
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
        message: error,
      })
    }
  }
}

export const login = async (req: Request, res: Response) => {
  const loginErrors = validateUser(req)

  const { email, password } = req.body

  const { requiredLength, isInvalidPassword, isInvalidEmail } = loginErrors

  if (!requiredLength && !isInvalidPassword && !isInvalidEmail) {
    try {
      const { userLogged, error } = await Repository.findEmail(email)

      if (error) {
        return res.status(400).json({
          success: false,
          message: error,
        })
      }

      if (userLogged) {
        //   console.log(userLogged.password)

        const hashedPassword = userLogged.password

        if (hashedPassword) {
          const isValidPassword = bcrypt.compareSync(password, hashedPassword)
          if (isValidPassword) {
            //creacion del token
            const token = Jwt.sign(
              {
                userId: userLogged.id,
                role: userLogged.role,
                username: userLogged.username
              },
              process.env.JWT_SECRET as string,
              {
                expiresIn: "2h",
              }
            )
            // devolver datos del usuario y el token
            return res.status(200).json({
              success: true,
              message: "User logged",
              token: token,
            })
          } else {
            return res.status(401).json({
              success: false,
              message: "Invalid password",
            })
          }
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      })
    }
  }
}
