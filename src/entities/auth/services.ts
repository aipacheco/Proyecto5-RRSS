import { Request } from "express"

export const validateUser = (req: Request) => {
  const { username, email, password } = req.body

  // Ejemplo de una validación de longitud de cadena de texto
  const requiredLength = (
    username: string,
    min: number,
    max: number,
    field: string
  ) => {
    if (username.length < min) {
      return `${field} must be at least ${min} characters long.`
    }
    if (username.length > max) {
      return `${field} must be less than ${max} characters.`
    }
  }
  const isInvalidPassword = (password: string) => {
    if (password.length < 8 || password.length > 15) {
      return "Password must be min 8 or max 15 chars."
    }
  }

  const isInvalidEmail = (email: string) => {
    if (!email) {
      return "You have to provide an email."
    }
    //regex de email
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!validEmail.test(email)) {
      return "format email invalid"
    }
  }
  const validationErrors = {
    requiredLength: requiredLength(username, 3, 20, "Nombre de usuario"),
    isInvalidPassword: isInvalidPassword(password),
    isInvalidEmail: isInvalidEmail(email),
  }

  return validationErrors
}
