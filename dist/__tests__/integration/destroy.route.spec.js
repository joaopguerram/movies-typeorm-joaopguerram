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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const mocks_1 = require("../mocks");
describe('DELETE /movies', () => {
    let connection;
    let deleteUrl;
    const baseUrl = '/movies';
    const deleteInvalidIDUrl = baseUrl + '/123456';
    const movieRepo = data_source_1.AppDataSource.getRepository(entities_1.Movie);
    let movieDelete;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => console.error(error));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const movies = yield movieRepo.find();
        yield movieRepo.remove(movies);
        movieDelete = yield movieRepo.save(mocks_1.deleteRouteMock.movieTemplate);
        deleteUrl = baseUrl + `/${movieDelete.id}`;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it('Success: Must be able to delete a movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete(deleteUrl);
        const expectResults = { status: 204 };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual({});
        const [movies, count] = yield movieRepo.findAndCount();
        expect(count).toBe(0);
        expect(movies).toStrictEqual(expect.arrayContaining([]));
    }));
    it("Error: Must not be able to delete a movie - ID doesn't exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).patch(deleteInvalidIDUrl);
        const expectResults = {
            status: 404,
            bodyMessage: { message: 'Movie not found' },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyMessage);
        const [movies, count] = yield movieRepo.findAndCount();
        expect(count).toBe(1);
        expect(movies).toStrictEqual(expect.arrayContaining([expect.objectContaining(movieDelete)]));
    }));
});
