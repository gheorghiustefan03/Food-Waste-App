const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const foodItemRouter = require('./foodItem');
const preferenceRouter = require('./preference');
const { resetDb } = require('../config');

router.use('/user', userRouter);
router.use('/foodItem', foodItemRouter);
router.use('/preference', preferenceRouter);
router.route('/reset').get(resetDb);

module.exports = router;