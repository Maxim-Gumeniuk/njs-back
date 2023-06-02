import express from 'express';
import { 
    createNewHero, 
    deleteImageCont, 
    deleteOneHero, 
    getHero, 
    getHeroes, 
    updateImage, 
    updateOneHero 
} from '../controllers/heroes-controller';
import { ROUTES } from '../types/enums/routes';
import { parser } from '../external-services/multer';
import { createHeroValodation } from '../validation/hero-validation-create';
import { updateHeroValodation } from '../validation/hero-validation-update';

export const heroesRouter = express.Router();

heroesRouter.get(`${ROUTES.ROOT}`, getHeroes);
heroesRouter.get(`${ROUTES.ID}`, getHero);
heroesRouter.post(`${ROUTES.ROOT}`, createHeroValodation , createNewHero);
heroesRouter.delete(`${ROUTES.ID}`, deleteOneHero);
heroesRouter.patch(`${ROUTES.ID}`,updateHeroValodation, updateOneHero);
heroesRouter.post(`${ROUTES.ID}${ROUTES.UPLOAD}`, parser.single('image'), updateImage);
heroesRouter.delete(`${ROUTES.ID}${ROUTES.DELETE}`, deleteImageCont);
