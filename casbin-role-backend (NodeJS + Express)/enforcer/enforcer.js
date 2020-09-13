const casbin = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
async function dbInstance()  {
    const a = await SequelizeAdapter.newAdapter({
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: 'root',
        database: 'myhiber',
        dialect: 'mysql',
    });
    return await casbin.newEnforcer(process.cwd()+'/model.conf', a)
}

module.exports.enforcer = dbInstance();