const express = require('express');
const { signup, singin } = require('../controller/auth');
const router = express.Router()   ;

router.post("/signup",signup);
router.post("/signin",singin);

module.exports = router;