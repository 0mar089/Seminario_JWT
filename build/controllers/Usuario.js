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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("../services/Usuario"));
const createUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { role } = _a, userData = __rest(_a, ["role"]);
        const savedUsuario = yield Usuario_1.default.createUsuario(userData);
        return res.status(201).json(savedUsuario);
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'El email ya está registrado' });
        }
        return res.status(500).json({ error });
    }
});
const readUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.params.usuarioId;
    try {
        const usuario = yield Usuario_1.default.getUsuario(usuarioId);
        return usuario ? res.status(200).json(usuario) : res.status(404).json({ message: 'not found' });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield Usuario_1.default.getAllUsuarios();
        return res.status(200).json(usuarios);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updateUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const usuarioId = req.params.usuarioId;
    // Protección de recurso: solo puedes actualizarte a ti mismo
    if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) !== usuarioId) {
        return res.status(403).json({ message: 'No tienes permiso para actualizar a otro usuario' });
    }
    try {
        const _c = req.body, { role } = _c, updateData = __rest(_c, ["role"]);
        const updatedUsuario = yield Usuario_1.default.updateUsuario(usuarioId, updateData);
        return updatedUsuario ? res.status(201).json(updatedUsuario) : res.status(404).json({ message: 'not found' });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const deleteUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const usuarioId = req.params.usuarioId;
    // Protección de recurso: solo puedes borrarte a ti mismo
    if (((_d = req.user) === null || _d === void 0 ? void 0 : _d.id) !== usuarioId) {
        return res.status(403).json({ message: 'No tienes permiso para borrar a otro usuario' });
    }
    try {
        const usuario = yield Usuario_1.default.deleteUsuario(usuarioId);
        return usuario ? res.status(201).json(usuario) : res.status(404).json({ message: 'not found' });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.default = { createUsuario, readUsuario, readAll, updateUsuario, deleteUsuario };
