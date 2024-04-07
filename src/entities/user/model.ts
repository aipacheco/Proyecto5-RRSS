import { Schema, model } from "mongoose"

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false // Esto hace que la contraseña no se devuelva por defecto
    },
    avatar:{
      type: String,
      default: ""
    },
    banner:{
      type: String,
      default: ""
    },
    isActive:{
      type: Boolean, 
      default: true
    },
    isPublic:{
      type: Boolean, 
      default: true
    },
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user",
    },
    // post:[]
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const User = model("User", UserSchema)

export default User