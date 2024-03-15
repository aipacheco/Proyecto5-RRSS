export const UsernameRequiredLength = (
    username: string,
    min: number,
    max: number,
  ) => {
    if (username.length < min) {
      return {error:`username must be at least ${min} characters long.`}
    }
    if (username.length > max) {
      return {error:`username must be less than ${max} characters.`}
    }
    return {success: true}
  }