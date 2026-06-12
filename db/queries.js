const pool = require("./pool.js");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");

    return rows;
}

async function getMessageById(messageId) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [messageId]);

    return rows[0];
}

async function updateMessageById(messageId, data) {
    await pool.query("UPDATE messages SET username = ($1), message = ($2), date_added = CURRENT_TIMESTAMP WHERE id = ($3)", [data.username, data.message, messageId])
    return;
}

async function getMessageByUser(username) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE LOWER(username) = ($1)", [username]);

    return rows;
}

async function postMessage(username, message) {
    await pool.query("INSERT INTO messages (username, message) VALUES ($1, $2)", [username, message]);

    return;
}

// Changelogs
async function getChangelogs() {
    const { rows } = await pool.query("SELECT * FROM changelog");

    return rows;
}

module.exports = {
    getAllMessages,
    getMessageById,
    getMessageByUser,
    updateMessageById,
    postMessage,
    getChangelogs
}
