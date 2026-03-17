"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config/config");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EA Sem5 API',
            version: '1.0.0',
            description: 'API REST de Organizaciones y Usuarios',
        },
        servers: [
            {
                url: `http://localhost:${config_1.config.server.port}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // IMPORTANTE: leer los .js compilados en build/routes
    apis: [path_1.default.join(__dirname, 'routes', '*.js')],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
