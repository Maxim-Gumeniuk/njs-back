import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

export const cloudStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req: Request, file: File) => ({
      formats: ['png', 'jpg', 'svg'],
      unique_filename: true,
      folder: 'public',
    }),
});
