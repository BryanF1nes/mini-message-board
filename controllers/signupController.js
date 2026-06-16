const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const pool = require("../db/pool")
const { links } = require("./indexController");

function getSignUp(req, res) {
    return res.render("base-template", {
        title: "Sign Up",
        content: "signup/signupform",
        links: links(req)
    });
}

async function postSignUp(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userResult = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
            [req.body.username, hashedPassword]
        );

        const userId = userResult.rows[0].id;

        await pool.query("INSERT INTO profiles (user_id) VALUES ($1)", [userId]);

        res.redirect("/log-in");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSignUp,
    postSignUp
}
