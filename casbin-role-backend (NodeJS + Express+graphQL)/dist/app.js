"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router/router"));
const app = express_1.default();
app.use(cors_1.default());
app.use(router_1.default);
app.listen(process.env.PORT || '5000', () => {
    console.log(`Server is running on ${process.env.PORT || '5000'}`);
});
