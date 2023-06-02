"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responses = void 0;
var Responses;
(function (Responses) {
    Responses[Responses["OK"] = 200] = "OK";
    Responses[Responses["CREATED"] = 201] = "CREATED";
    Responses[Responses["NO_CONTENT"] = 204] = "NO_CONTENT";
    Responses[Responses["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    Responses[Responses["FORBIDDEN"] = 403] = "FORBIDDEN";
    Responses[Responses["UNPROCESSABLE"] = 422] = "UNPROCESSABLE";
})(Responses || (exports.Responses = Responses = {}));
