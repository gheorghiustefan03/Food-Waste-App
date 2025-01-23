const { followsTable } = require('../models');
const {Op} = require('sequelize');

const 
followsController = {
    createFollows: async (req, res) => {
        try {
            const { followerId, followeeId } = req.body;

            const payload = {
                followerId,
                followeeId
            };
            
            if(followerId === followeeId){
                res.status(400).json({message: 'A user cannot follow themselves'});
                return;
            }
           
            const createdFollows = await followsTable.create(payload);
            res.status(200).json(createdFollows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error for create follows' });
        }
    },
    deleteFollows: async (req, res) => {
        try {
            const {rows} = await followsTable.findAndCountAll({
                where: {
                    followerId: {
                        [Op.eq]: req.params.followerId
                    },
                    followeeId: {
                        [Op.eq]: req.params.followeeId
                    }
                }
            });
            if (!rows) {
                res.status(404).json({ message: `No follows found` });
                return;
            }
            rows[0].destroy();

            res.status(200).json({ message: `Follows deleted` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error for delete follows' });
        }
    },
    getFollows: async (req, res) => {
        try {
            const {rows} = await followsTable.findAndCountAll({
                where: {
                    followerId: {
                        [Op.eq]: req.params.followerId
                    },
                    followeeId: {
                        [Op.eq]: req.params.followeeId
                    }
                }
            });
            console.log(rows);
            if (!rows) {
                res.status(404).json({ message: `No follows with provided users found` });
            }
            else {
                res.status(200).json(rows[0]);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error for get follows' });
        }
    },
    getFriends: async (req, res) => {
        try{
            const {rows} = await followsTable.findAndCountAll({
                where: {
                    followerId: {
                        [Op.eq]: req.params.userId
                    }
                }
            });
            console.log(rows);
            if (!rows) {
                res.status(404).json({ message: `User has no friends` });
            }
            else {
                res.status(200).json(rows);
            }
        }
        catch(error){
            res.status(500).json({message: 'Server error for get friends'});
        }
    }
}

module.exports = followsController