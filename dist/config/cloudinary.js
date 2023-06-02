"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
require('dotenv').config();
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET, } = process.env;
cloudinary_1.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
    secure: true
});
