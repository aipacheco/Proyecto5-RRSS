import User from "../user/model"

export const register = async (user: any) => {
  const userCreated = await User.create(user)
  console.log(userCreated, "en repository")
  return userCreated
}

export const findEmail = async (email: string) => {
  const findEmail = await User.findOne({ email: email })
    .select("+password")
    .select("+role")
    .exec()
  return findEmail
}

export const findUsername = async (username: string) => {
  const usernameFind = await User.findOne({ username: username }).exec()
  return usernameFind
}
