const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/join', userCtrl.join);
router.post('/signin', userCtrl.signin);

module.exports = router;