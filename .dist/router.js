"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("./entities/auth/routes"));
const routes_2 = __importDefault(require("./entities/user/routes"));
const routes_3 = __importDefault(require("./entities/post/routes"));
const router = (0, express_1.Router)();
//rutas de auth
router.use("/auth", routes_1.default);
router.use("/users", routes_2.default);
router.use("/posts", routes_3.default);
exports.default = router;
