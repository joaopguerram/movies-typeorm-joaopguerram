"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDataIsValidMiddleware = void 0;
const ensureDataIsValidMiddleware = (schema) => (req, res, next) => {
    const validateData = schema.parse(req.body);
    req.body = validateData;
    next();
};
exports.ensureDataIsValidMiddleware = ensureDataIsValidMiddleware;
