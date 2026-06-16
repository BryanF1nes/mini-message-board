const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: process.env.DEV_CONNECTION_STRING,
})
