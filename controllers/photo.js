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


const uploadPhoto = (req, res, next) => {
        let name = req.file.originalname;
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
                console.log(res)
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw new Error('Could not upload to imgur')
                }
            })
            .then(async (resolve) => {
                let photo = resolve.data.link;
                console.log('IMGUR PHOTO HAS UPLOADED, LINK:', photo)
                let username = 'mg_456_789'; let password = '4rtghlae'; let message = 'test';
                console.log('LOOK HERE COOKIE', cookie)
                let data = await uploadInsta(photo, message, username, password);
            })
            //     if(data.name !== 'Error') {
            //         let deleteHash = resolve.data.deletehash;
            //         fetch(`https://api.imgur.com/3/image/${deleteHash}`, {
            //             method: 'POST',
            //             headers: {
            //                 Authorization: 'Client-ID 8f1d643d8417402'
            //             }
            //         })
            //         .then(res => {
            //             if (res.status === 200) {
            //                 console.log('imgur image deleted')
            //             } else {
            //                 return new Error({'Error': res})
            //             }
            //         })
            //         .catch(err => {throw new Error(err)})
            //     } else {
            //         throw new Error({'Error': data.message})
            //     }
            // })
            // .catch(err => console.log('Error: ', err))
            
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
        console.log('MYPHOTO: ', myPhoto, 'MESSAGE: ', message, 'CLIENT:', client)
        await client.uploadPhoto({ photo: myPhoto, caption: message, post: 'feed' })
        .then(response => {
            console.log('RESPONSE:', response)
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