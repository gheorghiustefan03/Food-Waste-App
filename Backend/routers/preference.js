const express = require('express');
const router = express.Router();
const { preferenceController } = require('../controllers');
const preferenceMiddleware = require('../controllers/middleware').preference;

router.route('/create').post(preferenceMiddleware.checkPayload, preferenceController.createPreference);
router.route('/get').get(preferenceController.getAllPreferences);
router.route('/get/:id').get(preferenceController.getPreferenceById);
router.route('/update/:id').put(preferenceMiddleware.checkPayload, preferenceController.updatePreference);
router.route('/delete/:id').delete(preferenceController.deletePreference);

module.exports = router;