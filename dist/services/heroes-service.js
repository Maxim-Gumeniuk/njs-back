"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteImage = exports.imageUpload = exports.updateHero = exports.deleteHero = exports.createHero = exports.getOneHero = exports.getAll = void 0;
const model_1 = require("../db/model");
const cloudinary = __importStar(require("cloudinary"));
const forPublic_id_1 = require("../helpers/forPublic_id");
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
        }
    });
}
exports.getOneHero = getOneHero;
function createHero(nickName, realName, originalDescription, superPowers, catchPhrase) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!nickName || !realName || !originalDescription || !superPowers || !catchPhrase) {
                throw new Error('Missing required fields');
            }
            const newHero = {
                nickName,
                realName,
                originalDescription,
                superPowers,
                catchPhrase,
                images: [],
            };
            const createdHero = yield model_1.HeroModel.create(newHero);
            return createdHero;
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    });
}
exports.createHero = createHero;
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
function updateHero(id, newNickName, newRealName, newOriginalDescription, newSuperPowers, newCatchPhrase, newImages) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hero = yield getOneHero(id);
            if (hero) {
                const { nickName, realName, originalDescription, superPowers, catchPhrase, images } = hero;
                const updatedHero = Object.assign(Object.assign({}, hero), { nickName: newNickName || nickName, realName: newRealName || realName, originalDescription: newOriginalDescription || originalDescription, superPowers: newSuperPowers || superPowers, catchPhrase: newCatchPhrase || catchPhrase, images: newImages ? [...images, newImages] : images });
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
function imageUpload(id, newImages) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hero = yield model_1.HeroModel.findByPk(id);
            const updatedHero = Object.assign(Object.assign({}, hero), { images: (hero === null || hero === void 0 ? void 0 : hero.images.length) ? [...hero.images, newImages] : [newImages] });
            hero === null || hero === void 0 ? void 0 : hero.update(updatedHero);
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    });
}
exports.imageUpload = imageUpload;
function deleteImage(id, imageName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hero = yield model_1.HeroModel.findByPk(id);
            const validUrl = (0, forPublic_id_1.transformUrl)(imageName);
            cloudinary.v2.uploader.destroy(validUrl);
            const updatedHero = Object.assign(Object.assign({}, hero), { images: hero === null || hero === void 0 ? void 0 : hero.images.filter((img) => img !== imageName) });
            hero === null || hero === void 0 ? void 0 : hero.update(updatedHero);
            return updatedHero;
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    });
}
exports.deleteImage = deleteImage;
