import User from "./model"
import Post from "../post/model"

export const getUsers = async () => {
  const users = await User.find()
  if (!users) {
    return { error: "Usuarios no encontrados" }
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
  description?: string,
  avatar?: string,
  banner?: string
) => {
  const myProfile = await User.findById(userId)
  if (!myProfile) {
    return { error: "Perfil no encontrado" }
  }

  const updateData: { description?: string; avatar?: string; banner?: string } =
    {}
  if (description) updateData.description = description
  if (avatar) updateData.avatar = avatar
  if (banner) updateData.banner = banner

  const updatedProfile = await User.findOneAndUpdate(
    { _id: userId },
    updateData,
    { new: true }
  )

  return { updated: updatedProfile }
}

export const updateDescription = async (
  userId: number,
  description: string
) => {
  const myProfile = await User.findById(userId)
  if (!myProfile) {
    return { error: "Perfil no encontrado" }
  }

  const updatedProfile = await User.findOneAndUpdate(
    { _id: userId },
    { description: description },
    { new: true }
  )
  return { updated: updatedProfile }
}

export const findUsername = async (userId: number) => {
  const search = await User.findById(userId)
  if (!search) {
    return { error: "Usuario no encontrado" }
  }
  return search.username
}

export const getUserPosts = async (userId: string) => {
  const userPosts = await Post.find({
    author: userId,
  })
  if (!userPosts) {
    return { error: "El usuario no tiene posts" }
  }
  return { post: userPosts }
}

export const getUserByEmail = async (email: string) => {
  const findEmail = await User.findOne({ email: email })
  if (!findEmail) {
    return { error: "Email no encontrado" }
  }
  return { data: findEmail }
}

export const inactiveUser = async (userId: string) => {
  const profile = await User.findById(userId)
  if (!profile) {
    return { error: "Perfil no encontrado" }
  }

  if (profile.role === "super_admin") {
    return { error: "No puedes borrar a un administrador" }
  }

  const userInactive = await User.findOneAndUpdate(
    { _id: userId },
    { isActive: false },
    { new: true }
  )
  return { user: userInactive }
}
