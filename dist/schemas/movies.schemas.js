"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortSchema = exports.movieSchemaUpdate = exports.moviesSchemaResponse = exports.movieSchemaRequest = exports.movieSchema = void 0;
const zod_1 = require("zod");
const movieSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(3).max(50),
    description: zod_1.z.string().nullable().optional(),
    duration: zod_1.z.number().positive(),
    price: zod_1.z.number().int(),
});
exports.movieSchema = movieSchema;
const movieSchemaRequest = movieSchema.omit({ id: true });
exports.movieSchemaRequest = movieSchemaRequest;
const moviesSchemaResponse = zod_1.z.array(movieSchema);
exports.moviesSchemaResponse = moviesSchemaResponse;
const movieSchemaUpdate = movieSchemaRequest.partial();
exports.movieSchemaUpdate = movieSchemaUpdate;
const sortSchema = zod_1.z.enum(["id", "duration", "price"]).default("id");
exports.sortSchema = sortSchema;
