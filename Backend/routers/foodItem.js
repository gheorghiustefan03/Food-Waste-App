const express = require('express');
const router = express.Router();
const { foodItemController } = require('../controllers');
const foodItemMiddleware = require('../controllers/middleware').foodItem;

router.route('/create').post(foodItemMiddleware.checkPayload, foodItemController.createFoodItem);
router.route('/get').get(foodItemController.getAllFoodItems);
router.route('/get/:id').get(foodItemController.getFoodItemById);
router.route('/update/:id').put(foodItemMiddleware.checkPayload, foodItemController.updateFoodItem);
router.route('/delete/:id').delete(foodItemController.deleteFoodItem);
router.route('/getByUserId/:userId').get(foodItemController.getFoodItemsByUser);

module.exports = router;