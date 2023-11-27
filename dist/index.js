"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
server_1.default.listen(8100, function () { return console.log('Server is listening on port 8100...'); });
//# sourceMappingURL=index.js.map