import { Request } from "express"
import bcrypt from "bcrypt"
import * as Repository from "./repository"

export const validateUser = async (req: Request) => {
  const { username, email, password } = req.body
  interface Errors {
    [key: string]: string
  }

  let errors: Errors = {}

  const requiredLength = (
    value: string,
    min: number,
    max: number,
    field: string
  ) => {
    if (value.length < min) {
      errors[field] = `${field} must be at least ${min} characters long.`
    }
    if (value.length > max) {
      errors[field] = `${field} must be less than ${max} characters.`
    }
  }

  const isInvalidPassword = (value: string, field: string) => {
    if (value.length < 8 || value.length > 15) {
      errors[field] = `${field} must be 8-15 characters long`
    }
  }

  const isInvalidEmail = (value: string, field: string) => {
    if (!value) {
      errors[field] = "You have to provide an email."
    }
    const validEmailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!validEmailRegex.test(value)) {
      errors[field] = "Invalid email format."
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
  if (Object.keys(errors).length === 0 && !duplicatedEmail&& !duplicatedUsername) {
    const passEncript: string = bcrypt.hashSync(password, 12)

    const newUser = {
      username,
      email,
      password: passEncript,
    }
    console.log(newUser, "el service que en realidad es controller")
    return newUser
  }

  return errors
}
