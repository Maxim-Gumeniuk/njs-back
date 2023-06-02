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
exports.deleteOneHero = exports.updateOneHero = exports.uploadPhoto = exports.createNewHero = exports.getHero = exports.getHeroes = void 0;
const heroes_service_1 = require("../services/heroes-service");
const getHeroes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const heroes = yield (0, heroes_service_1.getAll)();
    if (!heroes) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(heroes);
});
exports.getHeroes = getHeroes;
const getHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const hero = yield (0, heroes_service_1.getOneHero)(id);
    if (!hero) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(hero);
});
exports.getHero = getHero;
const createNewHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickName, realName, originalDescription, superPowers, catchPhrase, } = req.body;
        const newHero = yield (0, heroes_service_1.createHero)(nickName, realName, originalDescription, superPowers, catchPhrase);
        res.status(201).send(newHero);
    }
    catch (error) {
        res.status(400).send(`${error}`);
    }
});
exports.createNewHero = createNewHero;
const uploadPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, heroes_service_1.updateHeroPhoto)(id, `../uploads/${req.file.originalname}`);
        res.json({
            message: 'hello',
            url: `uploads/${req.file.originalname}`
        });
    }
    catch (error) {
        console.log(JSON.parse(JSON.stringify(error)));
        res.status(400).send(`${error}`);
    }
});
exports.uploadPhoto = uploadPhoto;
const updateOneHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickName, realName, originalDescription, superPowers, catchPhrase, } = req.body;
        const { id } = req.params;
        const updatedHero = yield (0, heroes_service_1.updateHero)(id, nickName, realName, originalDescription, superPowers, catchPhrase);
        res.status(204).send(updatedHero);
    }
    catch (error) {
        res.status(400).send(`${error}`);
    }
});
exports.updateOneHero = updateOneHero;
const deleteOneHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const hero = yield (0, heroes_service_1.deleteHero)(id);
        if (hero) {
            yield hero.destroy();
        }
        res.status(200).json({ message: 'Hero deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ message: 'Hero not found' });
        return;
    }
});
exports.deleteOneHero = deleteOneHero;
