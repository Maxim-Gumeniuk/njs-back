import { check } from "express-validator";

export const updateHeroValodation = [
    check('nickName')
        .trim()
        .optional()
        .isLength({
        min: 2,
        max: 25
    }),
    check('realName')
        .trim()
        .optional()
        .isLength({
        min: 2,
        max: 25
    }),
    check('originalDescription')
        .trim()
        .optional()
        .isLength({
        min: 5,
        max: undefined
    }),
    check('superPowers')
        .trim()
        .optional()
        .isLength({
        min: 5,
        max: undefined
    }),
    check('catchPhrase')
        .trim()
        .optional()
        .isLength({
        min: 5,
        max: undefined
    }),
]