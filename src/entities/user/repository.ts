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
  username: string,
  email: string
) => {
  const myProfile = await User.findById(userId)
  if (!myProfile) {
    return { error: "profile not found" }
  }
  const usernameExisting = await User.findOne({ username: username })
  if (usernameExisting) {
    return { error: "username duplicated" }
  }
  const emailExisting = await User.findOne({ email: email })
  if (emailExisting) {
    return { error: "email duplicated" }
  }

  const updatedProfile = await User.findOneAndUpdate(
    { _id: userId },
    { username: username, email: email },
    { new: true }
  )
  return { updated: updatedProfile }
}

export const find = async(field:string)=>{
  const search = await User.findOne({ [field]: field }).exec()
  // if(!search){
  //   return {existing: `${field} in database`}
  // }
  console.log(search)
  return search
}