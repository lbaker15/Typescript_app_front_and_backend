const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;
const HttpError = require('./models/http-error');
const ScheduledPhotos = require('./models/scheduled-photos');
const upload = require('./controllers/photo');

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const adminData = require('./routes/admin');

app.use(express.static(path.join(__dirname, 'css')));
app.use('/admin', adminData.routes);
// app.use((req, res, next) => {
//     res.status(404).render('404', {pageTitle: 'Page Not Found'});
// });
app.use((error, req, res, next) => {
    console.log(error.message)
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

const listener = () => {
    // console.log('listener function ')
    ScheduledPhotos.find()
    .then((photos) => {
        // console.log('photos', photos)
        //CLEAR TIMEOUT
        clearTimeout(setInterval(() => {listener()}, 1000))
        photos.map(x => {
            //CHECK UPLOADED
            if (x.uploaded === false) {
                //COULD HAVE LOGGING FOR PHOTOS IN THE PAST THAT HAVE NOT UPLOADED
                let now = new Date().getTime()
                if (now < x.time) {        
                    // console.log('NOW', now, 'TIME', x.time)             
                    //SET TIMEOUT FOR EACH ONE
                    let diff = x.time - now;
                    let id = x._id; 
                    let {message, username, password, originalname} = x;
                    if (diff < 60000) {
                        // console.log('this section fired')
                        setTimeout(() => {
                            // console.log('in the timeout')
                            upload.actualUpload(id, message, username, password, originalname)
                        }, diff)
                    }
                    
                } else {
                    //BASED ON TIME THIS SHOULD HAVE ALREADY UPLOADED
                }
            } else {
                //IF ITS ALREADY UPLAODED THEN RETURN 
            }
        })
    })
}

mongoose.connect(
    `mongodb+srv://lbaker15:4rtghlae@cluster0.8pqo6.mongodb.net/Places?retryWrites=true&w=majority
    `, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('then block')
        setInterval(() => {console.log('interval'); listener()}, 60000)
        app.listen(port);
    })
    .catch(err => {
        console.log(err);
    });
