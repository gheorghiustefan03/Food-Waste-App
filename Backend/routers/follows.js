const express = require('express');
const router = express.Router();
const { followsController } = require('../controllers');

router.route('/create').post(followsController.createFollows);
router.route('/get/:followerId/:followeeId').get(followsController.getFollows);
router.route('/delete/:followerId/:followeeId').delete(followsController.deleteFollows);
router.route('/getFriends/:userId').get(followsController.getFriends);

module.exports = router;