import User from "./model"
import Post from "../post/model"

export const getUsers = async () => {
  const users = await User.find()
  if (!users) {
    return { error: "users not found" }
  }
  return { user: users }
}

export const getPublicProfile = async (username: String) => {
  const myProfile = await User.findOne({ username: username })
    .select("-email")
    .select("-isActive")
    .select("-role")

  if (!myProfile) {
    return { error: "profile not found" }
  }
  return { user: myProfile }
}

export const updateProfile = async (userId: number, username: string) => {
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

export const updateBanner = async (userId: number, bannerUrl: string) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { banner: bannerUrl },
    { new: true }
  )
  return { updated: updatedUser }
}

export const updateAvatar = async (userId: number, avatarUrl: string) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: avatarUrl },
    { new: true }
  )
  return { updated: updatedUser }
}