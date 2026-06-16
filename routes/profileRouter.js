const { Router } = require("express");
const profileController = require("../controllers/profileController");

const profileRouter = Router();

profileRouter.get("/", profileController.getProfile);

module.exports = profileRouter;
