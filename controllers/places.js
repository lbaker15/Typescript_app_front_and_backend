let key = process.env.GOOGLE_API;
const axios = require('axios');
const helpers = require('./functionHelpers');
const Places = require('../models/places');
const HttpError = require('../models/http-error');

const getProviders = async (req, res, next) => {
    let {address, distanceLimit, bedrooms} = req.body;
    console.log('fired')
    distanceLimit = (!distanceLimit) ? 1000 : distanceLimit;
    address = (!address) ? '19 Bransdale Crescent, York, YO10 3PB' : address;
    let addressEdit = await helpers.stringReplace(address)
    let clientAddress; 
    try {
        //AIzaSyAF8Tue0UNWttINWtoAeohWmagOUlDMCeg
        const {data} = await axios.post(`
            https://maps.googleapis.com/maps/api/geocode/json?address=${addressEdit}&key=${key}
        `)
        if (data.results[0]) {
            clientAddress = data.results[0].geometry.location;
        } else {
            console.log('fail')
            res.json({'Fail': 'key invalid'});
        }
        console.log(clientAddress)
    } catch(err) {
        console.log(err)
    }
    let array = new Array;
    //CHECK OTHER CONDITIONS HERE - PROVIDERS GENDER, AGE, TREATMENT E
    Places.find({}, async (err, result) => {
        console.log('RESULT', result)
        if (result) {       
            let promises = result.map(async (x) => {
                let obj = {'lat': x.lat, 'lng': x.lng}
                let data = await helpers.getDistance(obj, clientAddress)
                let km = Number(data)/1000
                if (km < distanceLimit) {
                    if (bedrooms) {
                        if (x.bedrooms === bedrooms.toLowerCase()) {
                            return array.push(x)
                        }
                    } else {
                        return array.push(x)
                    }
                } else { return }
            })
            Promise.all(promises).then(() => {
                res.json({'Data': array})
            })
        }
    })
}

const addProvider = async (req, res, next) => {
    let { address, name, telephone, bedrooms, propertyType, photo } = req.body;
    if (address && name && telephone && bedrooms) {
            let obj = {
                name: String(name).toLowerCase(),
                businessAddress: String(address).toLowerCase(),
                telephone: Number(telephone),
                bedrooms: String(bedrooms).toLowerCase(),
                photo: req.file.location,
                propertyType: String(propertyType).toLowerCase()
            }
            let address2;
            try {
                address2 = await helpers.stringReplace(obj.businessAddress)
            } catch(err) {
                let error = new HttpError('Could not convert address to lowercase', 500)
                return next(error);
            }
            let providerCoords;
            try {
                const {data} = await axios.post(`
                    https://maps.googleapis.com/maps/api/geocode/json?address=${address2}&key=${key}
                `)
                providerCoords = await data.results[0].geometry.location; 
                // setTimeout(async () => {
                        if (providerCoords.lat && providerCoords.lng) {
                            obj.lat = providerCoords.lat;
                            obj.lng = providerCoords.lng;
                            try {
                                let add = new Places(obj)
                                add.save().then((data, err) => {
                                
                                    return res.json({'Data': data})
                                })
                            } catch(err) {
                                let error = new HttpError('Could not save provider.', 500)
                                return next(error);
                            }
                        } else {
                            let error = new HttpError('Address fail, no provider coords.', 500)
                            return next(error);
                        }
                    // }, 100)
            } catch(err) {
                console.log('ERR', err.response.data, err.response.headers)
                let error = new HttpError('Address fail, address cannot be converted.', 500)
                return next(error);
            }
        } else {
            let error = new HttpError('Incomplete information form.', 422)
            return next(error);
        }
}

exports.getProviders = getProviders;
exports.addProvider = addProvider;