const casbin = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
const { host, portNumber, databaseUserName, databasePassword, databaseName } = require('../constants/constants')
async function dbInstance() {
    const a = await SequelizeAdapter.newAdapter({
        host: host,
        port: portNumber,
        username: databaseUserName,
        password: databasePassword,
        database: databaseName,
        dialect: 'mysql',
    });
    return await casbin.newEnforcer(process.cwd() + '/model.conf', a)
}

module.exports.enforcer = dbInstance();