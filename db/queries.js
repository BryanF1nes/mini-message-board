const pool = require("./pool.js");

async function getAllMessages() {
    const { rows } = await pool.query(
        "SELECT users.username, messages.id, messages.user_id, messages.body, messages.date_added FROM messages JOIN users ON messages.user_id = users.id;"
    );

    return rows;
}

async function getAllMessagesById(userId) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE user_id = $1", [userId]);

    return rows;
}

async function getMessageById(messageId) {
    const { rows } = await pool.query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE messages.id = $1", [messageId]);

    return rows[0];
}

async function editMessageById(messageId, data) {
    await pool.query("UPDATE messages SET body = ($2) WHERE id = ($1)", [messageId, data]);
}

async function getMessageByUser(username) {
    const { rows } = await pool.query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE LOWER(users.username) = $1", [username]);

    return rows;
}

async function postMessage(userId, { body, locked }) {
    return await pool.query("INSERT INTO messages (user_id, body, is_locked) VALUES ($1, $2, $3)", [userId, body, locked]);
}

async function deleteMessageById(messageId) {
    const result = await pool.query("DELETE FROM messages WHERE id = $1 RETURNING *", [messageId]);

    return result.rows[0];
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

async function postUpdateRole(userId, role) {
    await pool.query("UPDATE users SET role = ($2) WHERE id = ($1)", [userId, role]);

    return true;
}

// Profile
async function getProfileData(userId) {
    const { rows } = await pool.query("SELECT * FROM profile WHERE user_id = $1", [userId]);

    return rows[0]
}

async function editProfile(userId, body) {
    const { first_name, last_name, email, bio } = body;

    return await pool.query(
        `UPDATE profile
         SET
            first_name = $2,
            last_name = $3,
            email = $4,
            bio = $5
         WHERE user_id = $1`,
        [userId, first_name, last_name, email, bio]
    );

}

module.exports = {
    getAllMessages,
    getAllMessagesById,
    getMessageById,
    getMessageByUser,
    editMessageById,
    postMessage,
    deleteMessageById,
    getChangelogs,
    getAllUsers,
    postChangelog,
    postUpdateRole,
    getProfileData,
    editProfile
}
