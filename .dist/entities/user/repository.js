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
exports.getUserPosts = exports.findUsername = exports.updateProfile = exports.getMyProfile = exports.getUsers = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../post/model"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield model_1.default.find();
    if (!users) {
        return { error: "users not found" };
    }
    return { user: users };
});
exports.getUsers = getUsers;
const getMyProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const myProfile = yield model_1.default.findById(userId);
    if (!myProfile) {
        return { error: "profile not found" };
    }
    return { user: myProfile };
});
exports.getMyProfile = getMyProfile;
const updateProfile = (userId, username) => __awaiter(void 0, void 0, void 0, function* () {
    const myProfile = yield model_1.default.findById(userId);
    if (!myProfile) {
        return { error: "profile not found" };
    }
    const usernameExisting = yield model_1.default.findOne({ username: username });
    if (usernameExisting) {
        return { error: "username duplicated" };
    }
    const updatedProfile = yield model_1.default.findOneAndUpdate({ _id: userId }, { username: username }, { new: true });
    return { updated: updatedProfile };
});
exports.updateProfile = updateProfile;
const findUsername = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield model_1.default.findById(userId);
    if (!search) {
        return { error: "user not found" };
    }
    return search.username;
});
exports.findUsername = findUsername;
const getUserPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userPosts = yield model_2.default.find({
        author: userId,
    });
    if (!userPosts) {
        return { error: "user has no posts" };
    }
    return { post: userPosts };
});
exports.getUserPosts = getUserPosts;
