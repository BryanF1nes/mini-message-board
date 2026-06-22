const pool = require("../db/pool");

class Replies {
    async repliesByMessageID(messageId) {
        const { rows } = await pool.query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE messages.thread_id = $1", [messageId]);

        return rows;
    }

    async postReply(userId, body, messageId) {
        return await pool.query("INSERT INTO messages (user_id, body, thread_id) VALUES ($1, $2, $3)", [userId, body, messageId]);
    }
}

module.exports = new Replies();
