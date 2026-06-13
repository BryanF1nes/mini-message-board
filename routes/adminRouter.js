const { Router } = require("express");
const adminController = require("../controllers/adminController");

const adminRouter = Router();

adminRouter.get("/", adminController.getChangelog);
adminRouter.post("/changelog/create", adminController.postChangelog);

module.exports = adminRouter;
