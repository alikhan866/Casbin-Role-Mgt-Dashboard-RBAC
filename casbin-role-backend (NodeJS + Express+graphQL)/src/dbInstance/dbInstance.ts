import { newEnforcer }from 'casbin';
import { SequelizeAdapter } from 'casbin-sequelize-adapter';
import { host, portNumber, databaseUserName, databasePassword, databaseName } from '../constants/constants';

async function dbInstance() {
    const a = await SequelizeAdapter.newAdapter({
        host: host,
        port: parseInt(portNumber),
        username: databaseUserName,
        password: databasePassword,
        database: databaseName,
        dialect: 'mysql',
    });
    return await newEnforcer(process.cwd() + '/model.conf', a)
}

export default dbInstance();