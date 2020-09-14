const mysql = require('mysql2')
const { host, portNumber, databaseUserName, databasePassword, databaseName } = require('../constants/constants')

const pool = mysql.createPool({
    host: host,
    user: databaseUserName,
    password: databasePassword,
    database: databaseName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

let myDb = {}

myDb.getPolicy = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM casbin_rule where ptype="p"', (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}


myDb.getRole = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM casbin_rule where ptype="g"', (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}


myDb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM casbin_rule', (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

myDb.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM casbin_rule WHERE id = ?', [id] ,(err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0])
        })
    })
}

myDb.update = (id,v0,v1,v2) => {
    return new Promise((resolve, reject) => {
        pool.query('update casbin_rule set v0 = ?,v1 = ?,v2 = ? where id = ?', [v0,v1,v2,id] ,(err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0])
        })
    })
}

module.exports = myDb