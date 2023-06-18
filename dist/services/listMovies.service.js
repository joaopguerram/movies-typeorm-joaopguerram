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
const movies_schemas_1 = require("../schemas/movies.schemas");
const listMoviesService = (page, perPage, sort, orderParam) => __awaiter(void 0, void 0, void 0, function* () {
    const movieRepository = data_source_1.AppDataSource.getRepository(entities_1.Movie);
    if (perPage > 5 || perPage < 0 || !perPage)
        perPage = 5;
    if (page < 0 || !page)
        page = 1;
    if (!orderParam)
        orderParam = "asc";
    const take = Number(perPage) || 5;
    const skip = Number(page) || 1;
    const params = {
        take,
        skip: take * (skip - 1),
        order: {},
    };
    if (sort !== "id") {
        params.order = {
            [sort]: orderParam,
        };
    }
    else {
        params.order = {
            id: "asc",
        };
    }
    const [findMovies, totalMovies] = yield movieRepository.findAndCount(params);
    const movies = movies_schemas_1.moviesSchemaResponse.parse(findMovies);
    const count = totalMovies;
    const baseUrl = "http://localhost:3000/movies";
    let prevPage = `${baseUrl}?page=${skip - 1}&perPage=${take}`;
    if (skip - 1 <= 0)
        prevPage = null;
    let nextPage = `${baseUrl}?page=${Number(skip) + 1}&perPage=${take}`;
    if (movies.length < take)
        nextPage = null;
    const pagination = {
        prevPage,
        nextPage,
        count,
        data: movies,
    };
    return pagination;
});
exports.default = listMoviesService;
