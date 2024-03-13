"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.getPostById = exports.getAllPosts = exports.getMyPosts = exports.updatePost = exports.deletePost = exports.createPost = void 0;
const Repository = __importStar(require("./repository"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const { userId } = req.tokenData;
    //todo: validaciones
    try {
        const { post, error } = yield Repository.createPost(userId, content);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (post) {
            return res.status(201).json({
                success: true,
                message: "Post created",
                data: post,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.tokenData;
    //todo: validaciones
    try {
        const { post, error } = yield Repository.deletePost(id, userId);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (post) {
            return res.status(201).json({
                success: true,
                message: "Post deleted",
                data: post,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.deletePost = deletePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.tokenData;
    const { content } = req.body;
    //todo: validaciones
    try {
        const { post, error } = yield Repository.updatePost(id, userId, content);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (post) {
            return res.status(201).json({
                success: true,
                message: "Post updated",
                data: post,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.updatePost = updatePost;
const getMyPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.tokenData;
    const { postId, content } = req.body;
    try {
        const { post, error } = yield Repository.getMyPosts(userId);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (post) {
            return res.status(200).json({
                success: true,
                message: "All my posts",
                data: post,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.getMyPosts = getMyPosts;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { post, error } = yield Repository.getAllPosts();
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (post) {
            return res.status(200).json({
                success: true,
                message: "All posts",
                data: post,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const { post, error } = yield Repository.getPostById(postId);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (post) {
            return res.status(200).json({
                success: true,
                message: "Your post",
                data: post,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.getPostById = getPostById;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const { userId } = req.tokenData;
    try {
        const { post, error } = yield Repository.likePost(postId, userId);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (post) {
            return res.status(200).json({
                success: true,
                message: "You liked/disliked this post",
                data: post,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.likePost = likePost;
