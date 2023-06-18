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
    it("Query parameters: 'page' equals 0 and 'perPage' equals to 0", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(baseUrl + '?page=0&perPage=0');
        const expectResults = {
            status: 200,
            bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.default,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual));
    }));
    it("Query parameters: 'page' equals 1 and 'perPage' equals to 3", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(baseUrl + '?page=1&perPage=3');
        const expectResults = {
            status: 200,
            bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.page1PerPage3,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual));
    }));
    it("Query parameters: 'page' equals 3 and 'perPage' equals to 2", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(baseUrl + '?page=3&perPage=2');
        const expectResults = {
            status: 200,
            bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.page3PerPage2,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual));
    }));
    it("Query parameters: 'page' equals 4 and 'perPage' equals to 4", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(baseUrl + '?page=4&perPage=4');
        const expectResults = {
            status: 200,
            bodyToEqual: readRoutePaginationMocks.paginationPagePerPage.page4PerPage4,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual));
    }));
});
