const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/places');
const controller2 = require('../controllers/photos');
const bucket = require('../middleware/upload');

router.post('/places', controller.getProviders);
router.post('/add-place', controller.addProvider);
router.post('/insta-upload', bucket, controller2.uploadPhoto);

exports.routes = router;

