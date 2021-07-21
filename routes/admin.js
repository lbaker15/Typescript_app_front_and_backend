const  path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.render('addProduct')
});

exports.routes = router;

