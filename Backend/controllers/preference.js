const { preferenceTable } = require('../models');

const preferenceController = {
    createPreference: async (req, res) => {
        try {
            const { type } = req.body;

            const payload = {
                type
            };

           
            const createdPreference = await preferenceTable.create(payload);
            res.status(200).json(createdPreference);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error for create preference' });
        }
    },
    updatePreference: async (req, res) => {
        try {
            const preference = await preferenceTable.findByPk(req.params.id);
            if (!preference) {
                res.status(404).json({ message: `No preference with id ${req.params.id} in database` });
                return;
            }
            const { type } = req.body;
            const payload = {
                type
            };
            preference.update(payload);
            res.status(200).json(preference);
        } catch (error) {
            res.status(500).json({ message: 'Server error for update preference' });
        }
    },
    deletePreference: async (req, res) => {
        try {
            const preference = await preferenceTable.findByPk(req.params.id);
            if (!preference) {
                res.status(404).json({ message: `Preference with id ${req.params.id} not in database` });
                return;
            }
            preference.destroy();

            res.status(200).json({ message: `Preference with id ${req.params.id} deleted` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error for delete preference' });
        }
    },
    getAllPreferences: async (req, res) => {
        try {
            const preferences = await preferenceTable.findAll();
            if (preferences.length === 0) {
                res.status(400).json({ message: 'No preferences in database' });
            }
            else {
                res.status(200).json(preferences);
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error for get all preferences' });
        }
    },
    getPreferenceById: async (req, res) => {
        try {
            const preference = await preferenceTable.findByPk(req.params.id);
            if (!preference) {
                res.status(404).json({ message: `No preference with id ${req.params.id} in database` });
            }
            else {
                res.status(200).json(preference);
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error for get preference by Id' });
        }
    },
}

module.exports = preferenceController