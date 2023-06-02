"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHeroValodation = void 0;
const express_validator_1 = require("express-validator");
exports.updateHeroValodation = [
    (0, express_validator_1.check)('nickName')
        .trim()
        .optional()
        .isLength({
        min: 2,
        max: 25
    }),
    (0, express_validator_1.check)('realName')
        .trim()
        .optional()
        .isLength({
        min: 2,
        max: 25
    }),
    (0, express_validator_1.check)('originalDescription')
        .trim()
        .optional()
        .isLength({
        min: 5,
        max: undefined
    }),
    (0, express_validator_1.check)('superPowers')
        .trim()
        .optional()
        .isLength({
        min: 5,
        max: undefined
    }),
    (0, express_validator_1.check)('catchPhrase')
        .trim()
        .optional()
        .isLength({
        min: 5,
        max: undefined
    }),
];
