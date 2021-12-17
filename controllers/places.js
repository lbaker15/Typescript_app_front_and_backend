let key = process.env.GOOGLE_API;
const axios = require('axios');
const helpers = require('./functionHelpers');
const Places = require('../models/places');
const HttpError = require('../models/http-error');

const getProviders = async (req, res, next) => {
    let {address, distanceLimit, bedrooms, propertytype, price, price1, price2} = req.body;
    console.log('fired', price);
    distanceLimit = (!distanceLimit) ? 1000 : distanceLimit;
    address = (!address) ? '19 Bransdale Crescent, York, YO10 3PB' : address;
    let addressEdit = await helpers.stringReplace(address);
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
        console.log('RESULT', bedrooms, propertytype)
        if (result) {       
            let promises = result.map(async (x) => {
                console.log(x.price)
                let obj = {'lat': x.lat, 'lng': x.lng}
                let data = await helpers.getDistance(obj, clientAddress)
                let km = Number(data)/1000
                if (km < distanceLimit) {
                    console.log(bedrooms, propertytype, price)
                    if (bedrooms) {
                        if (propertytype) {
                            if (price.length !== 0) {
                                //BEDROOM & PROPERTY TYPE & PRICE DEFINED 
                                console.log('BEDROOM & PROPERTY TYPE & PRICE DEFINED ')
                                
                                
                                
                                if (x.price > price1 && x.price < price2 && x.bedrooms === bedrooms.toLowerCase() && x.propertytype === propertytype.toLowerCase()) {
                                    return array.push(x)
                                }
                            } else {
                                //BEDROOM & PROPERTY TYPE & NO PRICE DEFINED
                                console.log('BEDROOM & PROPERTY TYPE & NO PRICE DEFINED')
                                if (x.bedrooms === bedrooms.toLowerCase() && x.propertytype === propertytype.toLowerCase()) {
                                    return array.push(x)
                                }
                            }
                        } else {
                            
                            if (price.length !== 0) {
                                //BEDROOM & NO PROPERTY TYPE & PRICE DEFINED 
                                console.log('/BEDROOM & NO PROPERTY TYPE & PRICE DEFINED ')
                                
                                
                                
                                if (x.price > price1 && x.price < price2 && x.bedrooms === bedrooms.toLowerCase()) {
                                    return array.push(x)
                                }
                            }  else {
                                //BEDROOMS & NO PROPERTY TYPE & NO PRICE
                                console.log('BEDROOMS & NO PROPERTY TYPE & NO PRICE', x.bedrooms, bedrooms)
                                if (x.bedrooms === bedrooms.toLowerCase()) {
                                    return array.push(x)
                                }
                            }
                        }
                        
                    } else {
                        
                        if (propertytype) {
                            if (price.length !== 0) {
                                //NO BEDROOM & PROPERTY TYPE & PRICE DEFINED 
                                console.log('NO BEDROOM & PROPERTY TYPE & PRICE DEFINED ')
                                
                                
                                
                                if (x.price > price1 && x.price < price2 && x.propertytype === propertytype.toLowerCase()) {
                                    return array.push(x)
                                }
                            }  else {
                                //NO BEDROOMS & PROPERTY TYPE & NO PRICE
                                console.log('NO BEDROOMS & PROPERTY TYPE & NO PRICE')
                                if (x.propertytype === propertytype.toLowerCase()) {
                                    return array.push(x)
                                }
                            }
                        } else {
                            if (price.length !== 0) {
                                //NO BEDROOM & NO PROPERTY TYPE & PRICE DEFINED 
                                
                                
                                
                                console.log('NO BEDROOM & NO PROPERTY TYPE & PRICE DEFINED', x.price, price1, price2)
                                if (x.price > price1 && x.price < price2) {
                                    return array.push(x)
                                }
                            }  else {
                                //NO BEDROOMS & NO PROPERTY TYPE & NO PRICE
                                console.log('NO BEDROOMS & NO PROPERTY TYPE & NO PRICE')
                                return array.push(x)
                            }
                        }
                    }
                  
                } else { return }
            })
            Promise.all(promises).then(() => {
                res.json({'Data': array})
            })
        }
    })
}

const getAll = async (req, res, next) => {
    Places.find({}, async (err, result) => {
        console.log(err, result)
        if (err) {
            return new HttpError('Could not find providers', 500)
        } else {
            return res.json({'Data': result})
        }
    })
}

const addProvider = async (req, res, next) => {
    let { address, name, price, telephone, bedrooms, propertytype, photo, author, advert } = req.body;
    if (address && price && name && telephone && bedrooms && author, advert) {
            let obj = {
                name: String(name).toLowerCase(),
                businessAddress: String(address).toLowerCase(),
                telephone: Number(telephone),
                bedrooms: String(bedrooms).toLowerCase(),
                photo: req.file.location,
                propertytype: String(propertytype).toLowerCase(),
                author: String(author),
                advert: String(advert),
                price: Number(price)
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
exports.getAll = getAll;