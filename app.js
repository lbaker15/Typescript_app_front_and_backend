const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//Router routes
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');

//Middleware - always run next()
//Default response header is text/html for a string res
//Need bodyParser to parse req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'css')));
//Imports from router
app.use('/admin', adminRoutes);
app.use(productRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

//This creates the server
app.listen(3000);
