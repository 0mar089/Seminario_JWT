"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../utils/jwt");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Para leer el header de la peticion, la parte de Authorization
    const token = authHeader && authHeader.split(" ")[1]; // Aqui separa el token del header
    if (!token) {
        return res.status(401).json({ message: "Token requerido" }); // Si no hay token, retorna un error 401 (Unauthorized)
    }
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token); // Verifica el access token
        req.user = decoded;
        next(); // Si todo esta bien, pasa a la siguiente ruta
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ message: "Access token expirado" });
        }
        return res.status(401).json({ message: "Token inválido" });
    }
};
exports.authenticateToken = authenticateToken;
