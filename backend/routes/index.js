const express = require("express");
const userRoute = require("./user");
const cors = require("cors");




const router = express.Router();
router.use("/user", userRoute)

module.exports = router;
