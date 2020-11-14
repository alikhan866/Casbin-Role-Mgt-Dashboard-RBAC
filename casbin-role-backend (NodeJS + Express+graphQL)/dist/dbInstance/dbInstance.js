"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casbin_1 = require("casbin");
const casbin_sequelize_adapter_1 = require("casbin-sequelize-adapter");
const constants_1 = require("../constants/constants");
async function dbInstance() {
    const a = await casbin_sequelize_adapter_1.SequelizeAdapter.newAdapter({
        host: constants_1.host,
        port: parseInt(constants_1.portNumber),
        username: constants_1.databaseUserName,
        password: constants_1.databasePassword,
        database: constants_1.databaseName,
        dialect: 'mysql',
    });
    return await casbin_1.newEnforcer(process.cwd() + '/model.conf', a);
}
exports.default = dbInstance();
