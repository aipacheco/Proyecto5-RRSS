import User from "../user/model"

export const register = async (newUser: any) => {
  const findEmail = await User.findOne({ email: newUser.email }).exec()

  if (findEmail) {
    return { error: "Email already in use." }
  }
  const findUsername = await User.findOne({ username: newUser.username }).exec()

  if (findUsername) {
    return { error: "Username already in use." }
  }

  const userCreated = await User.create(newUser)
  return { user: userCreated }
}

export const findEmail = async (email: string) => {
  const findEmail = await User.findOne({ email: email })
  .select('+password')
  .select('+role')
  .exec()

  if (!findEmail) {
    return { error: "Email not found" }
  }
  return {userLogged: findEmail}
}
