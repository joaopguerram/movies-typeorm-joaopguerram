"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movies_controllers_1 = require("../controllers/movies.controllers");
const ensureDataIsValid_middleware_1 = require("../middlewares/ensureDataIsValid.middleware");
const movies_schemas_1 = require("../schemas/movies.schemas");
const ensureNameNotExists_middleware_1 = __importDefault(require("../middlewares/ensureNameNotExists.middleware"));
const ensureIdExists_middleware_1 = __importDefault(require("../middlewares/ensureIdExists.middleware"));
const moviesRoutes = (0, express_1.Router)();
moviesRoutes.post("", (0, ensureDataIsValid_middleware_1.ensureDataIsValidMiddleware)(movies_schemas_1.movieSchemaRequest), ensureNameNotExists_middleware_1.default, movies_controllers_1.createMoviesController);
moviesRoutes.get("", movies_controllers_1.listMoviesController);
moviesRoutes.patch("/:id", (0, ensureDataIsValid_middleware_1.ensureDataIsValidMiddleware)(movies_schemas_1.movieSchemaUpdate), ensureIdExists_middleware_1.default, ensureNameNotExists_middleware_1.default, movies_controllers_1.updateMovieController);
moviesRoutes.delete("/:id", ensureIdExists_middleware_1.default, movies_controllers_1.deleteMovieController);
exports.default = moviesRoutes;
