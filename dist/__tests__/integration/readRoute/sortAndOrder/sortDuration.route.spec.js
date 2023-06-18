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
const app_1 = __importDefault(require("../../../../app"));
const data_source_1 = require("../../../../data-source");
const mocks_1 = require("../../../mocks");
describe('Tests on route: GET /movies. Must be able to list all movies.', () => {
    let connection;
    const baseUrl = '/movies';
    let readRoutePaginationMocks;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            connection = res;
            readRoutePaginationMocks = yield mocks_1.readRouteMock.readPaginationMock();
        }))
            .catch((error) => console.error(error));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it("Query parameters: 'sort' equals 'duration' and without 'order'", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(baseUrl + '?sort=duration');
        const expectResults = {
            status: 200,
            bodyToEqual: readRoutePaginationMocks.paginationSortPrice.durationDefault,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual));
    }));
    it("Query parameters: 'sort' equals 'duration' and 'order' equals 'asc'", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(baseUrl + '?sort=duration&order=asc');
        const expectResults = {
            status: 200,
            bodyToEqual: readRoutePaginationMocks.paginationSortPrice.durationDefault,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual));
    }));
    it("Query parameters: 'sort' equals 'duration' and 'order' equals 'desc'", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(baseUrl + '?sort=duration&order=desc');
        const expectResults = {
            status: 200,
            bodyToEqual: readRoutePaginationMocks.paginationSortPrice.durationOrderDesc,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual));
    }));
});
