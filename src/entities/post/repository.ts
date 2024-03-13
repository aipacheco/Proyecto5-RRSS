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
  const userID = await User.findById(userId)
  if (!userID) {
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

export const getMyPosts = async (userId: number) => {
  const userID = await User.findById(userId)
  if (!userID) {
    return { error: "user not found" }
  }
  const allMyPosts = await Post.find({
    author: userID,
  })
  return { post: allMyPosts }
}

export const getAllPosts = async () => {
  const allPosts = await Post.find({})
  if (!allPosts) {
    return { error: "No posts found" }
  }
  return { post: allPosts }
}

export const getPostById = async (postId: string) => {
  const postFind = await Post.findById(postId)
  if (!postFind) {
    return { error: "post not found" }
  }
  return { post: postFind }
}

export const likePost = async (postId: string, userId: any) => {
  const post = await Post.findById(postId)
  if (!post) {
    return { error: "Post not found" }
  }
  // Comprobar si el usuario ya ha dado like al post
  const index = post.likes.indexOf(userId)
  // console.log(index)
  if (index === -1) {
    post.likes.push(userId)
  } else {
    post.likes.splice(index, 1)
  }
  const updatedPost = await post.save()
  return { post: updatedPost }
}
