const { userTable } = require('../../models');
const { utils } = require('../../config');

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const controller = {
    checkPayload: async (req, res, next) => {
        try {
            let errors = [];

            for (let key in req.body) {
                if (typeof (req.body[key]) === 'string')
                    req.body[key] = utils.standardizeStr(req.body[key])
            }

            const payload = req.body;
            const { name, expirationDate, UserId } = payload;

            if ((name == null || expirationDate == null || UserId == null) && req.method === 'POST') {
                errors.push("Every attribute mandatory for creating food item");
            }


            if (name != null) {
                if (name.length < 2) {
                    errors.push("Name must have at least 2 characters");
                }
            }
            if (expirationDate != null) {
                if (!dateRegex.test(expirationDate)) {
                    errors.push("Date format for expiration date invalid")
                }
            }
            if(UserId != null){
                if(await userTable.findByPk(UserId) === null)
                    errors.push("User with UserId provided not in table");
            }

            if (errors.length === 0)
                next();
            else {
                const jsonMsg = { ...errors };
                res.status(400).json({ message: jsonMsg });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }

    }
};

module.exports = controller;