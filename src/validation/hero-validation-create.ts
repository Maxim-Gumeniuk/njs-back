import { check } from "express-validator";

export const createHeroValodation = [
    check('nickName')
        .trim()
        .isLength({
        min: 2,
        max: 25
    }),
    check('realName')
        .trim()
        .isLength({
        min: 2,
        max: 25
    }),
    check('originalDescription')
        .trim()
        .isLength({
        min: 5,
        max: undefined
    }),
    check('superPowers')
        .trim()
        .isLength({
        min: 5,
        max: undefined
    }),
    check('catchPhrase')
        .trim()
        .isLength({
        min: 5,
        max: undefined
    }),
]
