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
exports.findEmail = exports.register = void 0;
const model_1 = __importDefault(require("../user/model"));
const register = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const findEmail = yield model_1.default.findOne({ email: newUser.email }).exec();
    if (findEmail) {
        return { error: "Email already in use." };
    }
    const findUsername = yield model_1.default.findOne({ username: newUser.username }).exec();
    if (findUsername) {
        return { error: "Username already in use." };
    }
    const userCreated = yield model_1.default.create(newUser);
    return { user: userCreated };
});
exports.register = register;
const findEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const findEmail = yield model_1.default.findOne({ email: email })
        .select("+password")
        .select("+role")
        .exec();
    if (!findEmail) {
        return { error: "Email not found" };
    }
    return { userLogged: findEmail };
});
exports.findEmail = findEmail;
