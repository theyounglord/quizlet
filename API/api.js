const express = require('express');
const router = express.Router();

router.use("/auth", require("./Auth/auth.js"));

module.exports = router;