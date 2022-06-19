const express = require('express');
const router = express.Router();

router.use("/auth", require("./Auth/auth.js"));
router.use("/admin", require("./admin/admin.js"));
router.use("/user", require("./user/user.js"));

module.exports = router;