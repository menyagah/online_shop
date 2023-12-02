"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createJwt = function (user) {
    var token = jsonwebtoken_1.default.sign({
        id: user.id,
        phone: user.phone
    }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
    });
    return token;
};
exports.createJwt = createJwt;
var protect = function (req, res) {
    var bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json('not authorized').end();
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map