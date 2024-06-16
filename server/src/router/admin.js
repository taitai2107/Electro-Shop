const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
router.post("/create", AdminController.addUser);
router.delete("/delete/:userid", AdminController.delUser);
router.put("/update/:userid", AdminController.updateUser);
router.get("/getAll", AdminController.getAllUser);
module.exports = router;
