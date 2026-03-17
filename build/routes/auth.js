"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const joi_1 = __importDefault(require("joi"));
const Joi_1 = require("../middleware/Joi");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
// Schemas de validación para auth
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Endpoints de autenticación
 *
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y devuelve el JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "omar@gmail.com"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', (0, Joi_1.ValidateJoi)(loginSchema), auth_1.login);
/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Refresca el token JWT
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refrescado correctamente
 *       401:
 *         description: No autorizado (token faltante o inválido)
 */
router.post('/refresh', auth_1.refreshToken);
/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Cierra sesión y revoca el refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout exitoso
 */
/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido con éxito
 *       401:
 *         description: No autorizado
 */
router.get('/me', auth_2.authenticateToken, auth_1.getMe);
exports.default = router;
