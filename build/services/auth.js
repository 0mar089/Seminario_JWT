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
exports.refreshUserSession = exports.getTokens = exports.validateUserCredentials = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const jwt_1 = require("../utils/jwt");
const validateUserCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield Usuario_1.default.findOne({ email });
    if (!usuario)
        return null;
    const isMatch = yield bcryptjs_1.default.compare(password, usuario.password);
    if (!isMatch)
        return null;
    return usuario;
});
exports.validateUserCredentials = validateUserCredentials;
const getTokens = (usuario) => {
    const accessToken = (0, jwt_1.generateAccessToken)(String(usuario._id), usuario.name, usuario.email, usuario.organizacion, usuario.role);
    const refreshToken = (0, jwt_1.generateRefreshToken)(String(usuario._id), usuario.name, usuario.email, usuario.organizacion, usuario.role);
    return { accessToken, refreshToken };
};
exports.getTokens = getTokens;
const refreshUserSession = (incomingRefreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, jwt_1.verifyRefreshToken)(incomingRefreshToken);
    const usuario = yield Usuario_1.default.findById(payload.id);
    if (!usuario)
        throw new Error('Usuario no encontrado');
    const tokens = (0, exports.getTokens)(usuario);
    return tokens;
});
exports.refreshUserSession = refreshUserSession;
