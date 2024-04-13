import User from "./model"
import Post from "../post/model"

export const getUsers = async () => {
  const users = await User.find()
  if (!users) {
    return { error: "users not found" }
  }
  return { user: users }
}

export const getPublicProfile = async (username: string) => {
  const userProfile = await User.findOne({ username }).select(
    "-email -isActive"
  )
  if (!userProfile) {
    return { error: "Perfil no encontrado" }
  }
  const userPosts = await Post.find({ author: userProfile._id })

  const profileWithPosts = {
    ...userProfile.toObject(),
    posts: userPosts,
  }

  return { user: profileWithPosts }
}

export const updateProfile = async (
  userId: number,
  description: string,
  avatar: String,
  banner: String
) => {
  const myProfile = await User.findById(userId)
  if (!myProfile) {
    return { error: "profile not found" }
  }

  const updatedProfile = await User.findOneAndUpdate(
    { _id: userId },
    { description: description, avatar: avatar, banner: banner },
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

export const getUserPosts = async (userId: string) => {
  const userPosts = await Post.find({
    author: userId,
  })
  if (!userPosts) {
    return { error: "user has no posts" }
  }
  return { post: userPosts }
}

export const getUserByEmail = async (email: string) => {
  const findEmail = await User.findOne({ email: email })
  if (!findEmail) {
    return { error: "email not found" }
  }
  return { data: findEmail }
}
