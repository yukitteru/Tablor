"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const express = require("express");
const http = require("http");
const G = {
    port: parseInt(process.env.PORT, 10) || 8484,
    host: process.env.HOST || 'localhost',
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        const server = http.createServer(app);
        app.use(express.static('static'));
        // Start listening.
        yield new Promise((resolve, reject) => server.listen(G.port, G.host, resolve).on('error', reject));
        const address = server.address();
        console.warn(`Server listening at http://${address.address}:${address.port}`);
    });
}
exports.main = main;
if (require.main === module) {
    main().catch((err) => console.error(err));
}
//# sourceMappingURL=server.js.map