const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("rensssasasd rce");
});

router.get("/cool", function (req, res, next) {
  res.send("so coooooooaasdsaaaaaaaaaaaaaaol");
});

module.exports = router;
