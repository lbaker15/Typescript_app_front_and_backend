let key = process.env.GOOGLE_API;
const axios = require('axios');
const helpers = require('./functionHelpers');

const getProviders = async (req, res, next) => {
    let {address, distanceLimit} = req.body;
    distanceLimit = (!distanceLimit) ? 1000 : distanceLimit;
    address = (!address) ? '19 Bransdale Crescent, York, YO10 3PB' : address;
    let addressEdit = await helpers.stringReplace(address)
    let clientAddress; 
    try {
        const {data} = await axios.post(`
            https://maps.googleapis.com/maps/api/geocode/json?address=${addressEdit}&key=${key}
        `)
        clientAddress = data.results[0].geometry.location;
    } catch(err) {
        console.log(err)
    }
    
    //CHECK OTHER CONDITIONS HERE - PROVIDERS GENDER, AGE, TREATMENT E
    Provider.find(
        val
    , async (err, result) => {
        console.log('RESULT', result)
        if (result) {       
            let promises = result.map(async (x) => {
                let obj = {'lat': x.lat, 'lng': x.lng}
                let data = await helpers.getDistance(obj, clientAddress)
                let km = Number(data)/1000
                if (km < distanceLimit) {
                    return array.push(x)
                } else { return }
            })
            Promise.all(promises).then(() => {
                res.json({'Data': array})
            })
        }
    })
}

exports.getProviders = getProviders;