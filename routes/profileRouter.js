const { Router } = require("express");
const profileController = require("../controllers/profileController");

const profileRouter = Router();

profileRouter.get("/", profileController.getProfile);
profileRouter.get("/:userId/edit", profileController.getEditProfile);
profileRouter.post("/:userId/edit", profileController.postEditProfile);

module.exports = profileRouter;
