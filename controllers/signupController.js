const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const pool = require("../db/pool")
const { links } = require("./indexController");

function getSignUp(req, res) {
    return res.render("base-template", { content: "signup/signupform", title: "Sign Up", links: links(req) });
}

async function postSignUp(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hashedPassword]);

        res.redirect("/log-in");
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    getSignUp,
    postSignUp
}
