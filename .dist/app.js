"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json()); //para convertir a json los datos recibidos
exports.app.get("/hello", (req, res) => {
    res.status(200).json({ success: true, msg: "server is ok" });
});
exports.app.use('/api', router_1.default);
