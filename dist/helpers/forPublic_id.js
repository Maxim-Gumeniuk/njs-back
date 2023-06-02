"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformUrl = void 0;
function transformUrl(url) {
    const startIndex = url.lastIndexOf("/") + 1;
    const endIndex = url.lastIndexOf(".");
    return url.substring(startIndex, endIndex);
}
exports.transformUrl = transformUrl;
