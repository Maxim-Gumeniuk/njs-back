"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHeroValodation = void 0;
const express_validator_1 = require("express-validator");
exports.createHeroValodation = [
    (0, express_validator_1.check)('nickName')
        .trim()
        .isLength({
        min: 2,
        max: 25
    }),
    (0, express_validator_1.check)('realName')
        .trim()
        .isLength({
        min: 2,
        max: 25
    }),
    (0, express_validator_1.check)('originalDescription')
        .trim()
        .isLength({
        min: 5,
        max: undefined
    }),
    (0, express_validator_1.check)('superPowers')
        .trim()
        .isLength({
        min: 5,
        max: undefined
    }),
    (0, express_validator_1.check)('catchPhrase')
        .trim()
        .isLength({
        min: 5,
        max: undefined
    }),
];
