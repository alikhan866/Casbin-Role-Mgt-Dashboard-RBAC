"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("../schema/schema"));
const router = express_1.Router();
router.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    graphiql: true
}));
exports.default = router;
