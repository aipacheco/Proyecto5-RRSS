"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.getPostById = exports.getAllPosts = exports.getMyPosts = exports.updatePost = exports.deletePost = exports.createPost = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../user/model"));
const createPost = (userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = yield model_2.default.findById(userId);
    if (!ID) {
        return { error: "user not found" };
    }
    const newPost = yield model_1.default.create({
        author: userId,
        content: content,
    });
    return { post: newPost };
});
exports.createPost = createPost;
const deletePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = yield model_2.default.findById(userId);
    if (!ID) {
        return { error: "user not found" };
    }
    const postFind = yield model_1.default.findById(postId);
    if (!postFind) {
        return { error: "post not found" };
    }
    const postDeleted = yield model_1.default.findOneAndDelete({ _id: postId });
    return { post: postDeleted };
});
exports.deletePost = deletePost;
const updatePost = (postId, userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = yield model_2.default.findById(userId);
    if (!userID) {
        return { error: "user not found" };
    }
    const postFind = yield model_1.default.findById(postId);
    if (!postFind) {
        return { error: "post not found" };
    }
    const postUpdated = yield model_1.default.findOneAndUpdate({ _id: postId }, { content: content }, { new: true });
    return { post: postUpdated };
});
exports.updatePost = updatePost;
const getMyPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = yield model_2.default.findById(userId);
    if (!userID) {
        return { error: "user not found" };
    }
    const allMyPosts = yield model_1.default.find({
        author: userID,
    });
    return { post: allMyPosts };
});
exports.getMyPosts = getMyPosts;
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield model_1.default.find({});
    if (!allPosts) {
        return { error: "No posts found" };
    }
    return { post: allPosts };
});
exports.getAllPosts = getAllPosts;
const getPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const postFind = yield model_1.default.findById(postId);
    if (!postFind) {
        return { error: "post not found" };
    }
    return { post: postFind };
});
exports.getPostById = getPostById;
const likePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield model_1.default.findById(postId);
    if (!post) {
        return { error: "Post not found" };
    }
    // Comprobar si el usuario ya ha dado like al post
    const index = post.likes.indexOf(userId);
    // console.log(index)
    if (index === -1) {
        post.likes.push(userId);
    }
    else {
        post.likes.splice(index, 1);
    }
    const updatedPost = yield post.save();
    return { post: updatedPost };
});
exports.likePost = likePost;
