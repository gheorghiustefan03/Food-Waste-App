const { foodItemTable } = require('../models');
const {Op} = require('sequelize');

const foodItemController = {
    createFoodItem: async (req, res) => {
        try{
            const {name, expirationDate, UserId} = req.body;
            const payload = {
                name,
                expirationDate,
                UserId
            };
            const createdFoodItem = await foodItemTable.create(payload);
            res.status(200).json(createdFoodItem);
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: 'Server Error'});
        }
    },
    getAllFoodItems: async (req, res) => {
        try {
            const foodItems = await foodItemTable.findAll();
            if (foodItems.length === 0) {
                res.status(400).json({ message: 'No food items in database' });
            }
            else {
                res.status(200).json(foodItems);
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    getFoodItemById: async (req, res) => {
        try {
            const foodItem = await foodItemTable.findByPk(req.params.id);
            if (!foodItem) {
                res.status(404).json({ message: `No food item with id ${req.params.id} in database` });
            }
            else {
                res.status(200).json(foodItem);
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    updateFoodItem: async (req, res) => {
        try {
            const foodItem = await foodItemTable.findByPk(req.params.id);
            if (!foodItem) {
                res.status(404).json({ message: `No food item with id ${req.params.id} in database` });
                return;
            }
            const { name, expirationDate } = req.body;
            const payload = {
                name,
                expirationDate
            };
            foodItem.update(payload);
            res.status(200).json(foodItem);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    deleteFoodItem: async (req, res) => {
        try {
            const foodItem = await foodItemTable.findByPk(req.params.id);
            if (!foodItem) {
                res.status(404).json({ message: `Food item with id ${req.params.id} not in database` });
                return;
            }
            foodItem.destroy();

            res.status(200).json({ message: `Food item with id ${req.params.id} deleted` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    getFoodItemsByUser: async(req, res) => {
        try{
            const {rows} = await foodItemTable.findAndCountAll({
                where: {
                    UserId: {
                        [Op.eq]: req.params.userId
                    }
                }
            });
            console.log(rows);
            res.status(200).json(rows);
        } catch(error){
            console.log(error);
            res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = foodItemController;