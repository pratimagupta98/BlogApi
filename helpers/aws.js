
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
console.log("ss3333",s3)


const params = {
    Bucket: 'blogsbuckets',
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "ap-south-1"
        //Asia Pacific (Mumbai) ap-south-1
    }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});

// const fileName = 'contacts.csv';

// const uploadFile = () => {
//   fs.readFile(fileName, (err, data) => {
//      if (err) throw err;
//      const params = {
//          Bucket: 'experteducation', // pass your bucket name
//          Key: '../helpers/new_user_credentials.csv', // file will be saved as testBucket/contacts.csv
//          Body: JSON.stringify(data, null, 2)
//      };
//      s3.upload(params, function(s3Err, data) {
//          if (s3Err) throw s3Err
//          console.log(`File uploaded successfully at ${data.Location}`)
//      });
//   });
// };

// uploadFile();