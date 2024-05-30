const {Pool} = require('pg')

const pool = new Pool({
    user: process.env.user || 'postgres',
    host: process.env.host  || 'localhost',
    database: process.env.database || 'soporte',
    password: process.env.password || '1234',
    DB_PORT: process.env.DB_PORT || '5432'   
})

module.exports = {
    pool
}
