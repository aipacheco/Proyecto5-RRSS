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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const Repository = __importStar(require("./repository"));
const services_1 = require("./services");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userErrors = (0, services_1.validateUser)(req);
    const { requiredLength, isInvalidPassword, isInvalidEmail } = userErrors;
    if (!requiredLength && !isInvalidPassword && !isInvalidEmail) {
        const { username, email, password } = req.body;
        const passEncript = bcrypt_1.default.hashSync(password, 12);
        const newUser = {
            username,
            email,
            password: passEncript,
        };
        try {
            const { user, error } = yield Repository.register(newUser);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error,
                });
            }
            if (user) {
                //se crea para devolver el user sin password hasheado
                const userToReturn = {
                    username: user.username,
                    email: user.email,
                };
                return res.status(201).json({
                    success: true,
                    message: "User created",
                    data: userToReturn,
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error,
            });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginErrors = (0, services_1.validateUser)(req);
    const { email, password } = req.body;
    const { requiredLength, isInvalidPassword, isInvalidEmail } = loginErrors;
    if (!requiredLength && !isInvalidPassword && !isInvalidEmail) {
        try {
            const { userLogged, error } = yield Repository.findEmail(email);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error,
                });
            }
            if (userLogged) {
                //   console.log(userLogged.password)
                const hashedPassword = userLogged.password;
                if (hashedPassword) {
                    const isValidPassword = bcrypt_1.default.compareSync(password, hashedPassword);
                    if (isValidPassword) {
                        //creacion del token
                        const token = jsonwebtoken_1.default.sign({
                            userId: userLogged.id,
                            role: userLogged.role,
                        }, process.env.JWT_SECRET, {
                            expiresIn: "5m",
                        });
                        // devolver datos del usuario y el token
                        return res.status(200).json({
                            success: true,
                            message: "User logged",
                            token: token,
                        });
                    }
                    else {
                        return res.status(401).json({
                            success: false,
                            message: "Invalid password",
                        });
                    }
                }
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error,
            });
        }
    }
});
exports.login = login;
