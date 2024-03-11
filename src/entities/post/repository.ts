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
