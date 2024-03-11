import { Request } from "express"
import User from "./model"

export const getUsers = async () => {
  const users = await User.find()
  if (!users) {
    return { error: "users not found" }
  }
  return {user: users}
}
