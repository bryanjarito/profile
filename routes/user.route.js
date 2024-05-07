const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/", addUser);

module.exports = router;
