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

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const { userId } = req.tokenData

  //todo: validaciones

  const { post, error } = await Repository.deletePost(id, userId)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    })
  }

  if (post) {
    return res.status(201).json({
      success: true,
      message: "Post deleted",
      data: post,
    })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const { userId } = req.tokenData
  const { content } = req.body

  //todo: validaciones

  const { post, error } = await Repository.updatePost(id, userId, content)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    })
  }

  if (post) {
    return res.status(201).json({
      success: true,
      message: "Post updated",
      data: post,
    })
  }
}

export const getMyPosts = async (req: Request, res: Response) => {
  const { userId } = req.tokenData
  const { postId, content } = req.body

  const { post, error } = await Repository.getMyPosts(userId, postId, content)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    })
  }

  if (post) {
    return res.status(200).json({
      success: true,
      message: "All my posts",
      data: post,
    })
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  const { post, error } = await Repository.getAllPosts()
  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    })
  }
  if (post) {
    return res.status(200).json({
      success: true,
      message: "All posts",
      data: post,
    })
  }
}

export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id

  try {
    const { post, error } = await Repository.getPostById(postId)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      })
    }
    if (post) {
      return res.status(200).json({
        success: true,
        message: "Your post",
        data: post,
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    })
  }
}

export const likePost = async (req: Request, res: Response) => {
  const postId = req.params.id
  const { userId } = req.tokenData

  try {
    const {post, error} = await Repository.likePost(postId, userId)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      })
    }
    if (post) {
      return res.status(200).json({
        success: true,
        message: "You liked/disliked this post",
        data: post,
      })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    })
  }
}
