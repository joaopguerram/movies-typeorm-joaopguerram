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
exports.deleteMovieController = exports.updateMovieController = exports.listMoviesController = exports.createMoviesController = void 0;
const createMovies_service_1 = require("../services/createMovies.service");
const listMovies_service_1 = __importDefault(require("../services/listMovies.service"));
const updateMovie_service_1 = __importDefault(require("../services/updateMovie.service"));
const movies_schemas_1 = require("../schemas/movies.schemas");
const deleteMovie_service_1 = __importDefault(require("../services/deleteMovie.service"));
const createMoviesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieData = req.body;
    const newMovie = yield (0, createMovies_service_1.createMovieService)(movieData);
    return res.status(201).json(newMovie);
});
exports.createMoviesController = createMoviesController;
const listMoviesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, perPage, sort, order } = req.query;
    const newSort = movies_schemas_1.sortSchema.parse(sort);
    const movies = yield (0, listMovies_service_1.default)(page, perPage, newSort, order);
    return res.json(movies);
});
exports.listMoviesController = listMoviesController;
const updateMovieController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = req.body;
    const idMovie = Number(req.params.id);
    const newMovie = yield (0, updateMovie_service_1.default)(idMovie, newData);
    return res.status(200).json(newMovie);
});
exports.updateMovieController = updateMovieController;
const deleteMovieController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idMovie = Number(req.params.id);
    const movie = yield (0, deleteMovie_service_1.default)(idMovie);
    return res.status(204).send();
});
exports.deleteMovieController = deleteMovieController;
