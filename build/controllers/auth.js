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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getMe = exports.logout = exports.refreshToken = exports.login = void 0;
const config_1 = require("../config/config");
const authService = __importStar(require("../services/auth"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
/**
 * POST /auth/login
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield authService.validateUserCredentials(email, password);
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        const { accessToken, refreshToken } = authService.getTokens(usuario);
        res.cookie(config_1.config.cookies.refreshName, refreshToken, config_1.config.cookies.options);
        return res.status(200).json({
            message: 'Login exitoso',
            accessToken,
            usuario: {
                _id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                organizacion: usuario.organizacion,
                role: usuario.role
            }
        });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.login = login;
/**
 * POST /auth/refresh
 */
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const incomingRefreshToken = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a[config_1.config.cookies.refreshName]) || ((_b = req.body) === null || _b === void 0 ? void 0 : _b.refreshToken);
        if (!incomingRefreshToken) {
            return res.status(401).json({ message: 'Refresh token requerido' });
        }
        const { accessToken, refreshToken: newRefreshToken } = yield authService.refreshUserSession(incomingRefreshToken);
        res.cookie(config_1.config.cookies.refreshName, newRefreshToken, config_1.config.cookies.options);
        return res.status(200).json({
            message: 'Token refrescado',
            accessToken
        });
    }
    catch (error) {
        return res.status(401).json({ message: 'Refresh token expirado o inválido' });
    }
});
exports.refreshToken = refreshToken;
/**
 * POST /auth/logout
 */
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie(config_1.config.cookies.refreshName, Object.assign({}, config_1.config.cookies.options));
        return res.status(200).json({ message: 'Logout exitoso' });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.logout = logout;
/**
 * GET /auth/me
 */
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const usuario = yield Usuario_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).populate('organizacion');
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(usuario);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getMe = getMe;
