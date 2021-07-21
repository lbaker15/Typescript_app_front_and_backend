const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/places');

router.post('/places', controller.getProviders);
router.post('/add-place', controller.addProvider);


exports.routes = router;

