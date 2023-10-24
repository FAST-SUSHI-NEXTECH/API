const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '10.10.x.x',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'your_db',
    connectionLimit: 5,
});

module.exports = pool;
