import multer from "multer";
import { cloudStorage } from "./cloudinary";

export const parser = multer({ storage: cloudStorage });