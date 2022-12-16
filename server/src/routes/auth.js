const express = require('express');
const { signup, singin } = require('../controller/auth');
const router = express.Router()   ;

router.post("/singup",signup);
router.post("/singin",singin);

module.exports = router;