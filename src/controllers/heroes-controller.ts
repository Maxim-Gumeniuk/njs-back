import { Request, Response } from "express";
import { createHero, deleteHero, deleteImage, getAll, getOneHero, imageUpload, updateHero } from "../services/heroes-service";
import { Responses } from "../types/enums/response/status";
import { validationResult } from 'express-validator';

export const getHeroes = async (req: Request, res: Response) => {
    const heroes = await getAll();

    if (!heroes) {
        res
          .status(Responses.NO_CONTENT)
          .json({ message: 'hero does not exist' });
        return;
    }

    res
      .status(Responses.OK)
      .send(heroes);
};

export const getHero = async (req: Request, res: Response) => {
    const { id } = req.params;
    const hero = await getOneHero(id);

    if (!hero) {
          res
            .status(Responses.NO_CONTENT)
            .json({ message: 'hero does not exist' });
        return;
    }

      res
        .status(Responses.OK)
        .json({ success: true, data: hero });
};

export const createNewHero = async (req: Request, res: Response) => {
    try {
      const {  
        nickName, 
        realName, 
        originalDescription, 
        superPowers, 
        catchPhrase,
      } = req.body;
     
      const newHero = await createHero(
        nickName, 
        realName, 
        originalDescription, 
        superPowers, 
        catchPhrase, 
      );
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        res
        .status(Responses.BAD_REQUEST)
        .json(errorsArray[0]);

        return;
    }
  
      if (newHero) {
        res
          .status(Responses.CREATED)
          .json({ success: true, data: newHero });
      } else {
        res
          .status(Responses.UNPROCESSABLE)
          .json({succes: false, message: 'Unable to create hero. Provide all fields.'});
      }
    } catch (error) {
      res
        .status(Responses.BAD_REQUEST)
        .json({ success: false, error: `${error}` });
    }
};

export const deleteOneHero = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const hero = await deleteHero(id);

      if (!hero) {
        res
        .status(Responses.BAD_REQUEST)
        .json({ message: 'Hero not found' });
        return;
      }

      await hero.destroy();
  
      res
        .status(Responses.NO_CONTENT)
        .json({ message: 'Hero deleted successfully' });
};
export const updateOneHero = async (req: Request, res: Response) => {
    const {             
        nickName, 
        realName, 
        originalDescription, 
        superPowers, 
        catchPhrase
    } = req.body;

    const { id } = req.params;
  
    const updatedHero = await updateHero(
        id,
        nickName, 
        realName, 
        originalDescription, 
        superPowers, 
        catchPhrase
    )
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      res
      .status(Responses.BAD_REQUEST)
      .json(errorsArray[0]);

      return;
  }
      if (!updatedHero) {
          res
            .status(Responses.BAD_REQUEST)
            .json({message: 'Hero did not update'});
      }

        res
          .status(Responses.OK)
          .json({message: 'Hero updated successfully', data: updatedHero});
};

export const updateImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  
    if (req.file) {
        await imageUpload(id, req.file.path)

        res
          .status(Responses.OK)
          .json({message: 'upload successful', data: req.file});
        return;
    }

    res
      .status(Responses.BAD_REQUEST)
      .json({ message: 'upload error' });
}

export const deleteImageCont = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { imageName } = req.body;
    
  const updatedHero = await deleteImage(id, imageName);

  if (!updatedHero) {
    res
      .status(Responses.BAD_REQUEST)
      .json({ message: 'Error deleting hero image' });
    return;
  }

  res
    .status(Responses.OK)
    .json({ message: 'Hero image deleted successfully' });
};
