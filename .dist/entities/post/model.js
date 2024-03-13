"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    // El autor del post, refiriéndose al ID del usuario que lo crea
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
}, {
    timestamps: true, // Crea automáticamente campos para 'createdAt' y 'updatedAt'
    versionKey: false, // No incluir la clave de versión (__v) en el documento
});
const Post = (0, mongoose_1.model)("Post", PostSchema);
exports.default = Post;
