const Users = require('../models/users');
const HttpError = require('../models/http-error');

const getUser = async (req, res, next) => {
    const {email, password} = req.body;
    Users.find({email: email, password: password}, async (err, result) => {
        if (result) {
            console.log(result)
            return res.json({'Key': 'value'})
        } else {
            console.log(err)
            return res.json({'Key': 'value'})
        }
    })
}

const addUser = async (req, res, next) => {
    const {email, password} = req.body;
    let obj = {email, password};
    try {
        let add = new Users(obj)
        add.save().then((data, err) => {
            return res.json({'Data': data})
        })
    } catch(err) {
        let error = new HttpError('Could not save provider.', 500)
        return next(error);
    }
}

exports.getUser = getUser;
exports.addUser = addUser;