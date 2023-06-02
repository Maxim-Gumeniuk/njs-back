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
exports.deleteHero = exports.updateHero = exports.updateHeroPhoto = exports.createHero = exports.getOneHero = exports.getAll = void 0;
const model_1 = require("../db/model");
const uuid_1 = require("uuid");
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const heroes = yield model_1.HeroModel.findAll();
            return heroes;
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    });
}
exports.getAll = getAll;
function getOneHero(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hero = yield model_1.HeroModel.findByPk(id);
            return hero;
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
            return;
        }
    });
}
exports.getOneHero = getOneHero;
function createHero(nickName, realName, originalDescription, superPowers, catchPhrase) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (nickName
                && realName
                && originalDescription
                && catchPhrase) {
                const newHero = yield model_1.HeroModel.create({
                    id: (0, uuid_1.v4)(),
                    nickName,
                    originalDescription,
                    superPowers,
                    catchPhrase,
                    realName,
                });
                return newHero;
            }
        }
        catch (error) {
            return null;
        }
    });
}
exports.createHero = createHero;
function updateHeroPhoto(id, url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hero = yield getOneHero(id);
            if (hero) {
                const newHeroPhoto = Object.assign(Object.assign({}, hero), { images: [...hero.images, url] });
                hero.update(newHeroPhoto);
                return newHeroPhoto;
            }
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
            return;
        }
    });
}
exports.updateHeroPhoto = updateHeroPhoto;
function updateHero(id, newNickName, newRealName, newOriginalDescription, newSuperPowers, newCatchPhrase, newImages) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hero = yield getOneHero(id);
            if (hero) {
                const { nickName, realName, originalDescription, superPowers, catchPhrase, images } = hero;
                const updatedHero = Object.assign(Object.assign({}, hero), { nickName: newNickName || nickName, realName: newRealName || realName, originalDescription: newOriginalDescription || originalDescription, superPowers: newSuperPowers || superPowers, catchPhrase: newCatchPhrase || catchPhrase, images: newImages || images });
                hero.update(updatedHero);
                return updatedHero;
            }
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    });
}
exports.updateHero = updateHero;
function deleteHero(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hero = yield model_1.HeroModel.findByPk(id);
            if (hero) {
                return hero;
            }
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
            return null;
        }
    });
}
exports.deleteHero = deleteHero;
