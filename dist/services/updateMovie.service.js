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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const entities_1 = require("../entities");
const errors_1 = require("../errors");
const movies_schemas_1 = require("../schemas/movies.schemas");
const updateMovieService = (idMovie, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const movieRepository = data_source_1.AppDataSource.getRepository(entities_1.Movie);
    const movie = yield movieRepository.findOne({
        where: {
            id: idMovie,
        },
    });
    if (movie === null) {
        throw new errors_1.AppError("Movie not found", 404);
    }
    const newMovie = movieRepository.create(Object.assign(Object.assign({}, movie), newData));
    yield movieRepository.save(newMovie);
    console.log(newMovie);
    const movieUpdated = movies_schemas_1.movieSchema.parse(newMovie);
    return movieUpdated;
});
exports.default = updateMovieService;
