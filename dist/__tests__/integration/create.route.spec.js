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
describe('POST /movies', () => {
    let connection;
    const baseUrl = '/movies';
    const movieRepo = data_source_1.AppDataSource.getRepository(entities_1.Movie);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => console.error(error));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const movies = yield movieRepo.find();
        yield movieRepo.remove(movies);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it('Success: Must be able to create a movie - Full body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createRouteMock.movieComplete);
        const expectResults = {
            status: 201,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(mocks_1.createRouteMock.movieComplete));
        expect(response.body).toEqual(expect.objectContaining({ id: expect.any(Number) }));
        const [movies, count] = yield movieRepo.findAndCount();
        expect(count).toBe(1);
        expect(movies).toEqual(expect.arrayContaining([expect.objectContaining(response.body)]));
    }));
    it('Success: Must be able to create a movie - Without "description"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createRouteMock.movieWithoutDescription);
        const expectResults = {
            status: 201,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(mocks_1.createRouteMock.movieWithoutDescription));
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            description: null,
        }));
        const [movies, count] = yield movieRepo.findAndCount();
        expect(count).toBe(1);
        expect(movies).toEqual(expect.arrayContaining([expect.objectContaining(response.body)]));
    }));
    it('Error: Must not be able to create a movie - Name already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        yield movieRepo.save(mocks_1.createRouteMock.movieUnique1);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createRouteMock.movieUnique2);
        const expectResults = {
            status: 409,
            bodyMessage: { message: 'Movie already exists.' },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyMessage);
        const [movies, count] = yield movieRepo.findAndCount();
        expect(count).toBe(1);
        expect(movies).toEqual(expect.arrayContaining([]));
    }));
    it('Error: Must not be able to create a movie - Invalid body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createRouteMock.movieInvalidBody);
        const expectResults = {
            status: 400,
            bodyMessage: {
                message: {
                    price: ['Required'],
                    name: ['Expected string, received number'],
                    duration: ['Expected number, received string'],
                },
            },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyMessage);
        const [movies, count] = yield movieRepo.findAndCount();
        expect(count).toBe(0);
        expect(movies).toEqual(expect.arrayContaining([]));
    }));
    it('Error: Must not be able to create a movie - Invalid body 2', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createRouteMock.movieInvalidBody2);
        const expectResults = {
            status: 400,
            bodyMessage: {
                message: {
                    duration: ['Number must be greater than 0'],
                    name: ['String must contain at most 50 character(s)'],
                    price: ['Expected integer, received float'],
                },
            },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyMessage);
        const [movies, count] = yield movieRepo.findAndCount();
        expect(count).toBe(0);
        expect(movies).toEqual(expect.arrayContaining([]));
    }));
});
