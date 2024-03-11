import { Request, Response } from "express"
import * as Repository from "./repository"

export const createPost = async (req: Request, res: Response) => {
  const { content } = req.body
  const { userId } = req.tokenData

  //todo: validaciones

  const { post, error } = await Repository.createPost(userId, content)

  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    })
  }

  if (post) {
    return res.status(201).json({
      success: true,
      message: "Post created",
      data: post,
    })
  }
}
