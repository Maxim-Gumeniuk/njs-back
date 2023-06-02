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
exports.deleteImageCont = exports.updateImage = exports.updateOneHero = exports.deleteOneHero = exports.createNewHero = exports.getHero = exports.getHeroes = void 0;
const heroes_service_1 = require("../services/heroes-service");
const status_1 = require("../types/enums/response/status");
const express_validator_1 = require("express-validator");
const getHeroes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const heroes = yield (0, heroes_service_1.getAll)();
    if (!heroes) {
        res
            .status(status_1.Responses.NO_CONTENT)
            .json({ message: 'hero does not exist' });
        return;
    }
    res
        .status(status_1.Responses.OK)
        .send(heroes);
});
exports.getHeroes = getHeroes;
const getHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const hero = yield (0, heroes_service_1.getOneHero)(id);
    if (!hero) {
        res
            .status(status_1.Responses.NO_CONTENT)
            .json({ message: 'hero does not exist' });
        return;
    }
    res
        .status(status_1.Responses.OK)
        .json({ success: true, data: hero });
});
exports.getHero = getHero;
const createNewHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickName, realName, originalDescription, superPowers, catchPhrase, } = req.body;
        const newHero = yield (0, heroes_service_1.createHero)(nickName, realName, originalDescription, superPowers, catchPhrase);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorsArray = errors.array();
            res
                .status(status_1.Responses.BAD_REQUEST)
                .json(errorsArray[0]);
            return;
        }
        if (newHero) {
            res
                .status(status_1.Responses.CREATED)
                .json({ success: true, data: newHero });
        }
        else {
            res
                .status(status_1.Responses.UNPROCESSABLE)
                .json({ succes: false, message: 'Unable to create hero. Provide all fields.' });
        }
    }
    catch (error) {
        res
            .status(status_1.Responses.BAD_REQUEST)
            .json({ success: false, error: `${error}` });
    }
});
exports.createNewHero = createNewHero;
const deleteOneHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const hero = yield (0, heroes_service_1.deleteHero)(id);
    if (!hero) {
        res
            .status(status_1.Responses.BAD_REQUEST)
            .json({ message: 'Hero not found' });
        return;
    }
    yield hero.destroy();
    res
        .status(status_1.Responses.NO_CONTENT)
        .json({ message: 'Hero deleted successfully' });
});
exports.deleteOneHero = deleteOneHero;
const updateOneHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickName, realName, originalDescription, superPowers, catchPhrase } = req.body;
    const { id } = req.params;
    const updatedHero = yield (0, heroes_service_1.updateHero)(id, nickName, realName, originalDescription, superPowers, catchPhrase);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        res
            .status(status_1.Responses.BAD_REQUEST)
            .json(errorsArray[0]);
        return;
    }
    if (!updatedHero) {
        res
            .status(status_1.Responses.BAD_REQUEST)
            .json({ message: 'Hero did not update' });
    }
    res
        .status(status_1.Responses.OK)
        .json({ message: 'Hero updated successfully', data: updatedHero });
});
exports.updateOneHero = updateOneHero;
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (req.file) {
        yield (0, heroes_service_1.imageUpload)(id, req.file.path);
        res
            .status(status_1.Responses.OK)
            .json({ message: 'upload successful', data: req.file });
        return;
    }
    res
        .status(status_1.Responses.BAD_REQUEST)
        .json({ message: 'upload error' });
});
exports.updateImage = updateImage;
const deleteImageCont = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { imageName } = req.body;
    const updatedHero = yield (0, heroes_service_1.deleteImage)(id, imageName);
    if (!updatedHero) {
        res
            .status(status_1.Responses.BAD_REQUEST)
            .json({ message: 'Error deleting hero image' });
        return;
    }
    res
        .status(status_1.Responses.OK)
        .json({ message: 'Hero image deleted successfully' });
});
exports.deleteImageCont = deleteImageCont;
