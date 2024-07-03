const express = require("express");
const userRoute = require("./user");
const cors = require("cors")

app.use(cors());


const router = express.Router();
router.use("/user", userRoute)

module.exports = router;
