import Post from "./model"
import User from "../user/model"
import { ObjectId } from "mongoose"

export const createPost = async (userId: number, content: string) => {
  const ID = await User.findById(userId)
  if (!ID) {
    return { error: "Usuario no encontrado" }
  }
  const newPost = await Post.create({
    author: userId,
    content: content,
  })
  return { post: newPost }
}

export const deletePost = async (postId: string, userId: number) => {
  const postFind = await Post.findById(postId)
  if (!postFind) {
    return { error: "Post no encontrado" }
  }
  const author = await Post.findOne({ _id: postId, author: userId })
  if (!author) {
    return { error: "No tienes autorización" }
  }
  await Post.findOneAndDelete({ _id: postId, author: userId })
  // para devolver los otros posts del usuario
  const remainingPosts = await Post.find({ author: userId })
  if (remainingPosts.length === 0) {
    return { message: "Ultimo post borrado" }
  }
  return { post: remainingPosts }
}

export const updatePost = async (
  postId: string,
  userId: number,
  content: string
) => {
  const postFind = await Post.findById(postId)
  if (!postFind) {
    return { error: "Post no encontrado" }
  }
  const author = await Post.findOne({ _id: postId, author: userId })
  if (!author) {
    return { error: "No tienes autorización" }
  }
  const postUpdated = await Post.findOneAndUpdate(
    { _id: postId },
    { content: content },
    { new: true }
  )
  return { post: postUpdated }
}

export const getMyPosts = async (userId: number) => {
  const userID = await User.findById(userId)
  if (!userID) {
    return { error: "Usuario no encontrado" }
  }
  const allMyPosts = await Post.find({
    author: userID,
  })
  return { post: allMyPosts }
}

export const getAllPosts = async () => {
  const allPosts = await Post.find({})
  if (!allPosts) {
    return { error: "No hay posts" }
  }
  return { post: allPosts }
}

export const getPostById = async (postId: string) => {
  //en el populate se ponen las propiedades separadas con espacio para que no de error
  const postFind = await Post.findById(postId).populate(
    "author",
    "avatar username"
  )
  if (!postFind) {
    return { error: "Post no encontrado" }
  }
  return { post: postFind }
}

export const likePost = async (postId: string, userId: any) => {
  const post = await Post.findById(postId)
  if (!post) {
    return { error: "Post no encontrado" }
  }
  // Comprobar si el usuario ya ha dado like al post
  let content = post.likes.includes(userId)
  let message: string = ""

  if (content) {
    message = "dislike"
    post.likes = post.likes.filter((id) => id != userId)
  } else {
    message = "like"
    post.likes.push(userId)
  }
  const updatedPost = await post.save()
  return { post: updatedPost, message }
}
export const getPublicPosts = async () => {
  const publicPosts = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
    { $match: { "userDetails.isPublic": true } },
    {
      $project: {
        content: 1,
        authorUsername: "$userDetails.username",
        publishedAt: 1,
        avatar: "$userDetails.avatar",
        image: 1,
        likes: 1,
      },
    },
  ])

  if (!publicPosts || publicPosts.length === 0) {
    return { error: "No hay posts públicos" }
  }

  return { post: publicPosts }
}
