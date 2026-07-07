const pool = require("../db/pool.js");

class Message {
    async messages() {
        const { rows } = await pool.query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id");

        return rows;
    }

    async messagesByUserID(userId) {
        const { rows } = await pool.query("SELECT * FROM messages WHERE user_id = $1", [userId]);

        return rows;
    }

    async messagesByMessageID(messageId) {
        const { rows } = await pool.query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE messages.id = $1", [messageId]);

        return rows[0];
    }

    async postMessage(userId, { body, can_reply }) {
        return await pool.query("INSERT INTO messages (user_id, body, can_reply) VALUES ($1, $2, $3)", [userId, body, can_reply]);
    }

    async editMessageById(messageId, { body, can_reply }) {
        await pool.query("UPDATE messages SET body = ($2), can_reply = ($3) WHERE id = ($1)", [messageId, body, can_reply]);
    }
}

module.exports = new Message();

// async function getMessageByUser(username) {
//     const { rows } = await pool.query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE LOWER(users.username) = $1", [username]);
//
//     return rows;
// }
//
// async function deleteMessageById(messageId) {
//     const result = await pool.query("DELETE FROM messages WHERE id = $1 RETURNING *", [messageId]);
//
//     return result.rows[0];
// }
//
