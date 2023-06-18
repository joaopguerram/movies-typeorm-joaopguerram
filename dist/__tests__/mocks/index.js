"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRouteMock = exports.readRouteMock = exports.deleteRouteMock = exports.createRouteMock = void 0;
const create_route_mock_1 = __importDefault(require("./create.route.mock"));
exports.createRouteMock = create_route_mock_1.default;
const delete_route_mock_1 = __importDefault(require("./delete.route.mock"));
exports.deleteRouteMock = delete_route_mock_1.default;
const read_route_mock_1 = __importDefault(require("./read.route.mock"));
exports.readRouteMock = read_route_mock_1.default;
const update_route_mock_1 = __importDefault(require("./update.route.mock"));
exports.updateRouteMock = update_route_mock_1.default;
