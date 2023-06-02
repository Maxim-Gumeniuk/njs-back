"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroesRouter = void 0;
const express_1 = __importDefault(require("express"));
const heroes_controller_1 = require("../controllers/heroes-controller");
const routes_1 = require("../types/routes");
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("../storage");
const upload = (0, multer_1.default)({ storage: storage_1.storage });
exports.heroesRouter = express_1.default.Router();
exports.heroesRouter.get(`${routes_1.ROUTES.ROOT}`, heroes_controller_1.getHeroes);
exports.heroesRouter.get(`${routes_1.ROUTES.ROOT}${routes_1.ROUTES.UPLOAD}`);
exports.heroesRouter.get(`${routes_1.ROUTES.ROOT}${routes_1.ROUTES.ID}`, heroes_controller_1.getHero);
exports.heroesRouter.post(`${routes_1.ROUTES.ROOT}`, heroes_controller_1.createNewHero);
exports.heroesRouter.post(`${routes_1.ROUTES.ROOT}${routes_1.ROUTES.ID}${routes_1.ROUTES.ROOT}${routes_1.ROUTES.UPLOAD}`, upload.single('file'), heroes_controller_1.uploadPhoto); ///+
exports.heroesRouter.patch(`${routes_1.ROUTES.ROOT}${routes_1.ROUTES.ID}`, heroes_controller_1.updateOneHero);
exports.heroesRouter.delete(`${routes_1.ROUTES.ROOT}${routes_1.ROUTES.ID}`, heroes_controller_1.deleteOneHero);
