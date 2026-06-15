const pool = require("./pool.js");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT users.username, messages.id, messages.body, messages.date_added FROM messages JOIN users ON messages.user_id = users.id;");

    return rows;
}

async function getMessageById(messageId) {
    const { rows } = await pool.query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE messages.id = $1", [messageId]);

    return rows[0];
}

async function updateMessageById(messageId, data) {
    await pool.query("UPDATE messages SET username = ($1), message = ($2), date_added = CURRENT_TIMESTAMP WHERE id = ($3)", [data.username, data.message, messageId])
    return;
}

async function getMessageByUser(username) {
    const { rows } = await pool.query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE LOWER(users.username) = $1", [username]);

    return rows;
}

async function postMessage(userId, body) {
    return await pool.query("INSERT INTO messages (user_id, body) VALUES ($1, $2)", [userId, body]);
}

// Changelogs
async function getChangelogs() {
    const { rows } = await pool.query("SELECT * FROM changelog");

    return rows;
}

async function postChangelog(description, changeItems) {
    await pool.query("INSERT INTO changelog (description, items) VALUES ($1, $2)", [description, changeItems]);

    return;
}

// Users
async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");

    return rows;
}

module.exports = {
    getAllMessages,
    getMessageById,
    getMessageByUser,
    updateMessageById,
    postMessage,
    getChangelogs,
    getAllUsers,
    postChangelog
}
