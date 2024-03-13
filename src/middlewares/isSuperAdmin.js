"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperAdmin = void 0;
const isSuperAdmin = (req, res, next) => {
    try {
        if (req.tokenData.role !== "super_admin") {
            return res.status(401).json({
                success: false,
                message: "UNAUTHORIZED",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "You dont have permisions",
        });
    }
};
exports.isSuperAdmin = isSuperAdmin;
