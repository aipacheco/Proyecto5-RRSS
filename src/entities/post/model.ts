import { Schema, model } from "mongoose"

const PostSchema = new Schema(
  {
    // El autor del post, refiriéndose al ID del usuario que lo crea
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    //estructura para poder dar like al post
    likes: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
  },
  {
    timestamps: true, // Crea automáticamente campos para 'createdAt' y 'updatedAt'
    versionKey: false, // No incluir la clave de versión (__v) en el documento
  }
)

const Post = model("Post", PostSchema)

export default Post
