const { Pool } = require("pg");


module.exports = new Pool({
    connectionString: "postgresql://bryan:root@localhost:5432/mini_message_board",
})
