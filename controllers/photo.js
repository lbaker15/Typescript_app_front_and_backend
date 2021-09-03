const aws = require('aws-sdk');
const fetch = require('node-fetch');
var FormData = require('form-data');
const FileCookieStore = require('tough-cookie-filestore2');
const Instagram = require('instagram-web-api');
const cookie = new FileCookieStore('./cookies.json');
//const cookie = cookieStore.idx['www.instagram.com']['/'].ig_cb;
const MIME = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}
const s3 = new aws.S3({
  region: 'eu-west-2',
  signatureVersion: 'v4',
  accessKeyId: `AKIAJV6EWBTTJJQFV7LQ`,
  secretAccessKey: `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`
})


const uploadPhoto = (req, response, next) => {
        let name = req.file.originalname;
        const {username, password} = req.body;
        console.log(username, password)
        const myBucket = 'multertest123';
        const getImage = async() => {
            const data = s3.getObject({Bucket: myBucket, Key: name}).promise()
            return data
        }
        getImage().then(async(img) => {
            let buffer = img.Body
            let formData = new FormData();
            formData.append('image', buffer)
            await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Client-ID 8f1d643d8417402'
                }
            })
            .then(res => {
                // console.log(res)
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw new Error('Could not upload to imgur')
                }
            })
            .then(async (resolve) => {
                let photo = resolve.data.link;
                let deleteHash = resolve.data.deleteHash;
                console.log('IMGUR PHOTO HAS UPLOADED')
                let message = 'test';
                let data = await uploadInsta(photo, message, username, password);
                if(data.name !== 'Error') {
                    let deleteHash = resolve.data.deletehash;
                    fetch(`https://api.imgur.com/3/image/${deleteHash}`, {
                        method: 'POST',
                        headers: {
                            Authorization: 'Client-ID 8f1d643d8417402'
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            console.log('imgur image deleted')
                            response.json({'Success': 'uploaded'})
                        } else {
                            return new Error({'Error': res})
                        }
                    })
                    .catch(err => {throw new Error(err)})
                } else {
                    throw new Error({'Error': data.message})
                }
            })            
        })
}

const uploadInsta = async (myPhoto, message, user, pass) => {
    let username = user;
    let password = pass;
    let client;
    try {
        client = new Instagram({ username, password, cookie });
        console.log('new instagram worked')
    } catch(err) { 
        console.log('fail new instagram')
        return new Error({'Error': err}) }
    //Upload to instagram
    try {
        await client.login()
        console.log('logged in')
    } catch(err) { 
        console.log('fail logging in ')
        return new Error({'Error': err}) }
    let media;
    try {
        //console.log('MYPHOTO: ', myPhoto, 'MESSAGE: ', message, 'CLIENT:', client)
        await client.uploadPhoto({ photo: myPhoto, caption: message, post: 'feed' })
        .then(response => {
            //console.log('RESPONSE:', response)
            return media = response.media;
        })
    } catch(err) {
        return new Error({'Error': err})
    }
    if (media) {
        return `https://www.instagram.com/p/${media.code}/`
    } else {
        return new Error({'Error': 'Could not upload through client'})
    }
}

exports.uploadPhoto = uploadPhoto;