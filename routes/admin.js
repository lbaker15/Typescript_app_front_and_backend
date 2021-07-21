const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/places');

router.get('/', controller.getProviders);

exports.routes = router;

