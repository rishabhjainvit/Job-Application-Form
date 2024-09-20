const express = require('express');
const { submitApplication, getApplication } = require('../controllers/applicationController'); // Adjust the path if necessary

const router = express.Router();

router.post('/submit', submitApplication);
router.post('/get', getApplication);

module.exports = router;
