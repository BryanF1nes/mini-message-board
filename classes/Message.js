const pool = require("../db/pool.js");

class Message {
    async messages() {
        const { rows } = await pool.query(
            "SELECT users.username, messages.id, messages.user_id, messages.body, messages.date_added FROM messages JOIN users ON messages.user_id = users.id WHERE thread_id = 0;"
        );

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
}

module.exports = new Message();

// async function editMessageById(messageId, data) {
//     await pool.query("UPDATE messages SET body = ($2) WHERE id = ($1)", [messageId, data]);
// }
//
// async function getMessageByUser(username) {
//     const { rows } = await pool.query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE LOWER(users.username) = $1", [username]);
//
//     return rows;
// }
//
// async function postMessage(userId, body) {
//     return await pool.query("INSERT INTO messages (user_id, body) VALUES ($1, $2)", [userId, body]);
// }
//
// async function deleteMessageById(messageId) {
//     const result = await pool.query("DELETE FROM messages WHERE id = $1 RETURNING *", [messageId]);
//
//     return result.rows[0];
// }
//
