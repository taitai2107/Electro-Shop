const express = require("express");
const router = express.Router();
const CateController = require("../controllers/categoryController");
router.get("/getAll", CateController.getAll);
router.delete("/delCate/:id", CateController.delCate);
router.post("/create", CateController.createCate);
module.exports = router;
