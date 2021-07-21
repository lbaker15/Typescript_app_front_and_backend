const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: false}));

//Router routes
const adminData = require('./routes/admin');

app.use(express.static(path.join(__dirname, 'css')));
app.use('/admin', adminData.routes);
// app.use((req, res, next) => {
//     res.status(404).render('404', {pageTitle: 'Page Not Found'});
// });

mongoose.connect(
    `mongodb+srv://lbaker15:4rtghlae@cluster0.8pqo6.mongodb.net/Places?retryWrites=true&w=majority
    `, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port);
    })
    .catch(err => {
        console.log(err);
    });
