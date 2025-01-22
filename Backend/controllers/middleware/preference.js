const { preferenceTable } = require('../../models');
const { utils } = require('../../config');


const controller = {
    checkPayload: async (req, res, next) => {
        try {
            const preferences = await preferenceTable.findAll();

            let errors = [];

            console.log('HERE');
            console.log(req.body.type);

            for (let key in req.body) {
                if (typeof (req.body[key]) === 'string')
                    req.body[key] = utils.standardizeStr(req.body[key])
            }

            const type = req.body.type;
            console.log(type);

            if (type == null) {
                errors.push("Type mandatory for creating preference");
            }


            if (type != null) {
                if (type.length < 2) {
                    errors.push("Type must have at least 2 characters");
                }
                if (!utils.isUniqueValue(type, preferences, 'type')){
                    errors.push("Type is not unique");
                }
            }
           

            if (errors.length === 0)
                next();
            else {
                const jsonMsg = { ...errors };
                res.status(400).json({ message: jsonMsg });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
            console.log(error);
        }

    }
};

module.exports = controller;