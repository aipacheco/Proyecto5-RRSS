import { Schema, model } from "mongoose"

const PostSchema = new Schema(
  {
    // El autor del post, refiriéndose al ID del usuario que lo crea
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Crea automáticamente campos para 'createdAt' y 'updatedAt'
    versionKey: false, // No incluir la clave de versión (__v) en el documento
  }
)

const Post = model("Post", PostSchema)


export default Post
