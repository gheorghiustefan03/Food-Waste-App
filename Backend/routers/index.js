const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const { resetDb } = require('../config');

router.use('/user', userRouter);
router.route('/reset').get(resetDb);

module.exports = router;