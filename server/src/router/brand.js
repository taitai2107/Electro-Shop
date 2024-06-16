const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
router.get("/getAll", brandController.getAll);
router.delete("/delBrand/:id", brandController.delBrand);
router.post("/create", brandController.createBrand);
module.exports = router;
