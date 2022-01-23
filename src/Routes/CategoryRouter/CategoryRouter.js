const express = require('express');

const service = require('../../Services/CategoryServices/CategoryServices.js');

const router = express.Router();

router.get('/', service.getAllCategory);

module.exports = router;