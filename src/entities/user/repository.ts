import { Request } from "express"
import User from "./model"

export const getUsers = async () => {
  const users = await User.find()
  if (!users) {
    return { error: "users not found" }
  }
  return { user: users }
}

export const getMyProfile = async (userId: number) => {
  const myProfile = await User.findById(userId)
  if (!myProfile) {
    return { error: "profile not found" }
  }
  return { user: myProfile }
}

export const updateProfile = async (
  userId: number,
  username: string
  // email: string
) => {
  const myProfile = await User.findById(userId)
  if (!myProfile) {
    return { error: "profile not found" }
  }
  const usernameExisting = await User.findOne({ username: username })
  if (usernameExisting) {
    return { error: "username duplicated" }
  }

  const updatedProfile = await User.findOneAndUpdate(
    { _id: userId },
    { username: username },
    { new: true }
  )
  return { updated: updatedProfile }
}

export const findUsername = async (userId: number) => {
  const search = await User.findById(userId)
  if (!search) {
    return { error: "user not found" }
  }

  return search.username
}
