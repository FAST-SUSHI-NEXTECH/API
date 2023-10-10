const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '192.168.5.30',
    port: 3306,
    user: 'rootbis',
    password: 'rootbis',
    database: 'fast_sushi',
    connectionLimit: 5,
});

module.exports = pool;