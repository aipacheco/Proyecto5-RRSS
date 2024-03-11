import { Request } from "express"
import Post from "./model"
import User from "../user/model"

export const createPost = async (userId: number, content: string) => {
  const ID = await User.findById(userId)
  if (!ID) {
    return { error: "user not found" }
  }

  const newPost = await Post.create({
    author: userId,
    content: content,
  })
  return { post: newPost }
}

export const deletePost = async (postId: string, userId: number) => {
  const ID = await User.findById(userId)
  if (!ID) {
    return { error: "user not found" }
  }
  const postFind = await Post.findById(postId)
  if (!postFind) {
    return { error: "post not found" }
  }
  const postDeleted = await Post.findOneAndDelete({ _id: postId })
  return { post: postDeleted }
}

export const updatePost = async (
  postId: string,
  userId: number,
  content: string
) => {
  const ID = await User.findById(userId)
  if (!ID) {
    return { error: "user not found" }
  }
  const postFind = await Post.findById(postId)
  if (!postFind) {
    return { error: "post not found" }
  }
  const postUpdated = await Post.findOneAndUpdate(
    { _id: postId },
    { content: content },
    { new: true }
  )
  return { post: postUpdated }
}
