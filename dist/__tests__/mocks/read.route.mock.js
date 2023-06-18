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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const readPaginationMock = () => __awaiter(void 0, void 0, void 0, function* () {
    const movieRepo = data_source_1.AppDataSource.getRepository(entities_1.Movie);
    const moviesTotal = 11;
    let uniqueDurations = [];
    let uniquePrices = [];
    const moviesTemplate = yield movieRepo.save(Array.from(Array(moviesTotal))
        .map((val, index) => {
        let price = Math.ceil(Math.random() * 100);
        let duration = Math.ceil(Math.random() * 100);
        while (uniquePrices.includes(price)) {
            price = Math.ceil(Math.random() * 100);
        }
        while (uniqueDurations.includes(duration)) {
            duration = Math.ceil(Math.random() * 100);
        }
        uniquePrices.push(price);
        uniqueDurations.push(duration);
        const name = `Filme ${String(index + 1).padStart(2, '0')}`;
        return { id: expect.any(Number), name, duration, price };
    })
        .map((_a) => {
        var { id } = _a, el = __rest(_a, ["id"]);
        return el;
    }));
    const paginationBase = {
        prevPage: null,
        nextPage: null,
        count: moviesTotal,
    };
    const paginationSortPrice = {
        priceDefault: Object.assign(Object.assign({}, paginationBase), { nextPage: 'http://localhost:3000/movies?page=2&perPage=5', data: moviesTemplate.sort((a, b) => a.price - b.price).slice(0, 5) }),
        priceOrderDesc: Object.assign(Object.assign({}, paginationBase), { nextPage: 'http://localhost:3000/movies?page=2&perPage=5', data: moviesTemplate.sort((a, b) => b.price - a.price).slice(0, 5) }),
        durationDefault: Object.assign(Object.assign({}, paginationBase), { nextPage: 'http://localhost:3000/movies?page=2&perPage=5', data: moviesTemplate.sort((a, b) => a.duration - b.duration).slice(0, 5) }),
        durationOrderDesc: Object.assign(Object.assign({}, paginationBase), { nextPage: 'http://localhost:3000/movies?page=2&perPage=5', data: moviesTemplate.sort((a, b) => b.duration - a.duration).slice(0, 5) }),
    };
    const paginationPagePerPage = {
        default: Object.assign(Object.assign({}, paginationBase), { nextPage: 'http://localhost:3000/movies?page=2&perPage=5', data: moviesTemplate.sort((a, b) => a.id - b.id).slice(0, 5) }),
        page2: Object.assign(Object.assign({}, paginationBase), { prevPage: 'http://localhost:3000/movies?page=1&perPage=5', nextPage: 'http://localhost:3000/movies?page=3&perPage=5', data: moviesTemplate.sort((a, b) => a.id - b.id).slice(5, 10) }),
        page3: Object.assign(Object.assign({}, paginationBase), { prevPage: 'http://localhost:3000/movies?page=2&perPage=5', nextPage: null, data: moviesTemplate.sort((a, b) => a.id - b.id).slice(10) }),
        page4: Object.assign(Object.assign({}, paginationBase), { prevPage: 'http://localhost:3000/movies?page=3&perPage=5', nextPage: null, data: [] }),
        perPage1: Object.assign(Object.assign({}, paginationBase), { nextPage: 'http://localhost:3000/movies?page=2&perPage=1', data: moviesTemplate.sort((a, b) => a.id - b.id).slice(0, 1) }),
        perPage3: Object.assign(Object.assign({}, paginationBase), { nextPage: 'http://localhost:3000/movies?page=2&perPage=3', data: moviesTemplate.sort((a, b) => a.id - b.id).slice(0, 3) }),
        page1PerPage3: Object.assign(Object.assign({}, paginationBase), { nextPage: 'http://localhost:3000/movies?page=2&perPage=3', data: moviesTemplate.sort((a, b) => a.id - b.id).slice(0, 3) }),
        page3PerPage2: Object.assign(Object.assign({}, paginationBase), { prevPage: 'http://localhost:3000/movies?page=2&perPage=2', nextPage: 'http://localhost:3000/movies?page=4&perPage=2', data: moviesTemplate.sort((a, b) => a.id - b.id).slice(4, 6) }),
        page4PerPage4: Object.assign(Object.assign({}, paginationBase), { prevPage: 'http://localhost:3000/movies?page=3&perPage=4', nextPage: null, data: [] }),
    };
    return { paginationSortPrice, paginationPagePerPage };
});
exports.default = { readPaginationMock };
