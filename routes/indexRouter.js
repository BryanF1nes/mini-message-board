const { Router } = require("express");
const indexController = require("../controllers/indexController.js");

const indexRouter = Router();

indexRouter.get("/", indexController.getIndex);
//indexRouter.post("/new", indexController.postMessage);

module.exports = indexRouter;
