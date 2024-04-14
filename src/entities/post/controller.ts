import { Request, Response } from "express"
import * as Repository from "./repository"
import { contentValidationError } from "./services"

export const createPost = async (req: Request, res: Response) => {
  const { content } = req.body
  const { userId } = req.tokenData

  const { success, error } = contentValidationError(content)
  // console.log("las dos opciones", success, error)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    })
  }
  if (success) {
    try {
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      })
    }
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const { userId } = req.tokenData
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const { userId } = req.tokenData
  const { content } = req.body

  const { success, error } = contentValidationError(content)
  // console.log("las dos opciones", success, error)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    })
  }
  if (success) {
    try {
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      })
    }
  }
}

export const getMyPosts = async (req: Request, res: Response) => {
  const { userId } = req.tokenData
  const { postId, content } = req.body
  try {
    const { post, error } = await Repository.getMyPosts(userId)
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    })
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { post, error } = await Repository.getPublicPosts()
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
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
    const { post, error, message } = await Repository.likePost(postId, userId)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      })
    }
    if (post) {
      return res.status(200).json({
        success: true,
        message: `You ${message} this post`,
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
export const getPublicPosts = () => async (req: Request, res: Response) => {
  console.log("hola")
  try {
    const { post, error } = await Repository.getPublicPosts()
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    })
  }
}
