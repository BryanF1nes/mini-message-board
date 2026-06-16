const db = require("../db/queries.js");
const { links } = require("./indexController");

async function getProfile(req, res) {
    // if (!req.user) {
    //     return res.status(404).send("You must login to view your profile");
    // }
    const data = await db.getProfileData(req.user.id);
    const messages = await db.getAllMessagesById(req.user.id);

    return res.render("base-template", {
        title: "Profile Page",
        content: "profile/profile",
        links: links(req),
        data: data,
        messages: messages
    });
}

async function getEditProfile(req, res) {
    const data = await db.getProfileData(req.user.id);

    return res.render("base-template", {
        title: "Edit Profile",
        content: "profile/editProfile",
        links: links(req),
        data: data
    });
}

async function postEditProfile(req, res) {
    const { userId } = req.params;
    console.log(req.body);
    await db.editProfile(userId, req.body);

    res.redirect("/profile");
}

module.exports = {
    getProfile,
    getEditProfile,
    postEditProfile
}
