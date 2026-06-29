const pool = require("../db/pool");

class Replies {
    async replies() {
        const { rows } = await pool.query("SELECT * FROM replies");

        return rows;
    }

    async repliesByMessageID(messageId) {
        const { rows } = await pool.query("SELECT replies.*, users.username FROM replies INNER JOIN users ON replies.user_id = users.id WHERE replies.message_id = $1", [messageId]);
        console.log(rows);

        return rows;
    }

    async postReply(userId, body, messageId) {
        return await pool.query("INSERT INTO replies (user_id, body, message_id) VALUES ($1, $2, $3)", [userId, body, messageId]);
    }
}

module.exports = new Replies();
