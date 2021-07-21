
var rad = function(x) {
  return x * Math.PI / 180;
};
var getDistance = function(p1, p2) {
    return new Promise((res, rej) => {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat - p1.lat);
        var dLong = rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        res(d); // returns the distance in km
    })
};

const stringReplace = (string) => {
    if (string.includes(' ')) {
        let newString = string.replace(' ', '+')
        return stringReplace(newString)
    } else if (string.includes(',')) {
        let newString = string.replace(',', '%2C')
        return stringReplace(newString)
    } else if (string.includes('é')) {
        let newString = string.replace('é', 'e')
        return stringReplace(newString)
    } else {
        return string;
    }
}

exports.stringReplace = stringReplace;
exports.getDistance = getDistance;

// else if (string.includes('"')) {
//     let newString = string.replace('"', '%22')
//     return stringReplace(newString)
// } else if (string.includes('#')) {
//     let newString = string.replace('#', '%23')
//     return stringReplace(newString)
// } else if (string.includes('%')) {
//     let newString = string.replace('"', '%25')
//     return stringReplace(newString)
// } else if (string.includes('|')) {
//     let newString = string.replace('|', '%7C')
//     return stringReplace(newString)
// }