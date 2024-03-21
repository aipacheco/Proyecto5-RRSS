import { Request } from "express"
import bcrypt from "bcrypt"
import * as Repository from "./repository"

export const validateUser = async (req: Request) => {
  const { username, email, password } = req.body
  interface Errors {
    [key: string]: {
      message: string
      status: number
    }
  }
  let errors: Errors = {}
  const requiredLength = (
    value: string,
    min: number,
    max: number,
    field: string
  ) => {
    if (value.length < min) {
      errors[field] = {
        message: `${field} must be at least ${min} characters long.`,
        status: 400,
      }
    }
    if (value.length > max) {
      errors[field] = {
        message: `${field} must be less than ${max} characters.`,
        status: 400,
      }
    }
  }
  const isInvalidPassword = (value: string, field: string) => {
    if (value.length < 8 || value.length > 15) {
      errors[field] = {
        message: `${field} must be 8-15 characters long`,
        status: 400,
      }
    }
  }
  const isInvalidEmail = (value: string, field: string) => {
    if (!value) {
      errors[field] = { message: "You have to provide an email.", status: 400 }
    }
    const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!validEmailRegex.test(value)) {
      errors[field] = { message: "Invalid email format.", status: 400 }
    }
  }
  // llamamos a requiredLength solo si username está presente
  if (username) {
    requiredLength(username, 3, 20, "Username")
  }
  isInvalidPassword(password, "Password")
  isInvalidEmail(email, "Email")
  // console.log(errors)
  const duplicatedEmail = await Repository.findEmail(email)
  const duplicatedUsername = await Repository.findUsername(username)
  //para comprobar si el objeto errors viene vacío
  if (
    Object.keys(errors).length === 0 &&
    !duplicatedEmail &&
    !duplicatedUsername
  ) {
    const passEncript: string = bcrypt.hashSync(password, 12)
    const newUser = {
      username,
      email,
      password: passEncript,
    }
    return newUser
  }
  return errors
}
