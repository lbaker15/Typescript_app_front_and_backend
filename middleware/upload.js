const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
// aws.config.update({
//     credentials: new aws.CognitoIdentityCredentials({
//         IdentityPoolId: 'eu-west-2:0e9b5926-887d-409b-a208-e075f2f5d770',
//     })
// })
// account id number - 399139821256
const s3 = new aws.S3({
  region: 'eu-west-2',
  signatureVersion: 'v4',
  accessKeyId: `AKIAJV6EWBTTJJQFV7LQ`,
  secretAccessKey: `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`
})
const storage = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: 'multertest123',
        key: function (req, file, cb) {
          //console.log("HERE", req, file)
          cb(null, file.originalname)
        },
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        }
     })
});
const fileUpload = storage.single('image');
exports.fileUpload = fileUpload;