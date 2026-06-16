const db = require("../db/queries.js");
const { links } = require("./indexController");

async function getProfile(req, res) {
    // if (!req.user) {
    //     return res.status(404).send("You must login to view your profile");
    // }
    const data = await db.getProfileData(req.user.id);
    console.log(data);

    return res.render("base-template", {
        title: "Profile Page",
        content: "profile/profile",
        links: links(req),
        data: data
    });
}

module.exports = {
    getProfile
}
