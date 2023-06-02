import { HeroModel } from "../db/model";
import * as cloudinary from 'cloudinary'
import { transformUrl } from "../helpers/forPublic_id";

export async function getAll() {
    try {
        const heroes = await HeroModel.findAll();

        return heroes;
    } catch (error) {
        console.log(JSON.stringify(error, null, 2));
    }
}

export async function getOneHero(id: string) {
    try {
        const hero = await HeroModel.findByPk(id);

        return hero;
    } catch(error) {
        console.log(JSON.stringify(error, null, 2));
    }
}

export async function createHero(
  nickName: string,
  realName: string,
  originalDescription: string,
  superPowers: string,
  catchPhrase: string,
) {
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

    const createdHero = await HeroModel.create(newHero);

    return createdHero;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
}

export async function deleteHero(id: string) {
  try {
      const hero = await HeroModel.findByPk(id);
  
      if (hero) {
        return hero;
      }
  } catch(error) {
      console.log(JSON.stringify(error, null, 2));
      return null;
  }
}

export async function updateHero(
    id: string,
    newNickName? : string, 
    newRealName?: string, 
    newOriginalDescription?: string, 
    newSuperPowers?: string, 
    newCatchPhrase?: string, 
    newImages?: string,
) {

    try {
        const hero = await getOneHero(id);
        if (hero) {
            const { 
              nickName, 
              realName,
              originalDescription, 
              superPowers, 
              catchPhrase, 
              images 
            } = hero;

            const updatedHero = {
                ...hero,
                nickName: newNickName || nickName, 
                realName: newRealName || realName,
                originalDescription: newOriginalDescription || originalDescription,
                superPowers: newSuperPowers || superPowers,
                catchPhrase: newCatchPhrase || catchPhrase,
                images:  newImages ? [...images, newImages] : images,
            };
            hero.update(updatedHero);
            return updatedHero;
        } 
     } catch(error) {
        console.log(JSON.stringify(error, null, 2));
       }
}

export async function imageUpload(id: string, newImages: string) {
    try {
        const hero = await HeroModel.findByPk(id);

        const updatedHero = {
            ...hero,
            images:  hero?.images.length ? [...hero.images, newImages] : [newImages],
        };
        hero?.update(updatedHero);


    } catch(error) {
        console.log(JSON.stringify(error, null, 2));
    }
} 

export async function deleteImage(id: string, imageName: string) {
    try {
        const hero = await HeroModel.findByPk(id);
        const validUrl = transformUrl(imageName);
        cloudinary.v2.uploader.destroy(validUrl);

        const updatedHero = {
            ...hero,
            images: hero?.images.filter((img) => img !== imageName),
        }

        hero?.update(updatedHero);
        return updatedHero;
    } catch(error) {
      console.log(JSON.stringify(error, null, 2));
    }
}
