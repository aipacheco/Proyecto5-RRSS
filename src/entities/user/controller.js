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
exports.getUserPosts = exports.updateProfile = exports.getMyProfile = exports.getUsers = void 0;
const Repository = __importStar(require("./repository"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, error } = yield Repository.getUsers();
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (user) {
            return res.status(201).json({
                success: true,
                message: "User created",
                data: user,
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
exports.getUsers = getUsers;
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.tokenData;
    try {
        const { user, error } = yield Repository.getMyProfile(userId);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (user) {
            return res.status(200).json({
                success: true,
                message: "Your profile",
                data: user,
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
exports.getMyProfile = getMyProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const { userId } = req.tokenData;
    try {
        const existingUsername = yield Repository.findUsername(userId);
        // Verificar si los campos no han cambiado
        if (existingUsername === username) {
            return res.status(400).json({
                success: false,
                message: "No changes detected. Your username was not updated",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
    try {
        const { updated, error } = yield Repository.updateProfile(userId, username);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (updated) {
            return res.status(201).json({
                success: true,
                message: "Your profile was updated",
                data: updated,
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
exports.updateProfile = updateProfile;
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const { post, error } = yield Repository.getUserPosts(userId);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        if (post) {
            return res.status(201).json({
                success: true,
                message: "Posts by user",
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
exports.getUserPosts = getUserPosts;
