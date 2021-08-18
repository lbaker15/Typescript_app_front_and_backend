const uploadPhoto = (req, res, next) => {
    console.log('upload fired', req.file)
    res.json({'Key': 'Value'})
}

exports.uploadPhoto = uploadPhoto;