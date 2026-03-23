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
const mongoose_1 = __importDefault(require("mongoose"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const createUsuario = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = new Usuario_1.default(Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, data));
    return yield usuario.save();
});
const getUsuario = (usuarioId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Usuario_1.default.findById(usuarioId).select('-password').populate('organizacion');
});
const getAllUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Usuario_1.default.find().select('-password').populate('organizacion');
});
const updateUsuario = (usuarioId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield Usuario_1.default.findById(usuarioId).select('-password');
    if (usuario) {
        usuario.set(data);
        return yield usuario.save();
    }
    return null;
});
const deleteUsuario = (usuarioId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Usuario_1.default.findByIdAndDelete(usuarioId);
});
exports.default = { createUsuario, getUsuario, getAllUsuarios, updateUsuario, deleteUsuario };
