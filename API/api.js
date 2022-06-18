const express = require('express');
const router = express.Router();

router.use("/auth", require("./Auth/auth.js"));
router.use("/admin", require("./admin/admin.js"));

module.exports = router;