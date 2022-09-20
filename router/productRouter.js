const express = require('express')
let routerProduct = express.Router()
const ProductSchema = require('../models/product')
const fs = require("fs");
const AWS = require('aws-sdk');

const ID = '';
const SECRET = '';
const BUCKET_NAME = 'myphoto-q';

const s3 = new AWS.S3({
    accessKeyId: 'AKIAWLIMT56T4QD7MEZH',
    secretAccessKey: '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',
  })

  const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        LocationConstraint: "ap-northeast-1"
    }
};

// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("get list buckets error", err);
//   } else {
//     console.log(data.Buckets[1]);
//   }
// });

s3.createBucket(params, function(err, data) {
    if (err) {
        console.log('err');
    } else {
        console.log('Bucket Created Successfully', data.Location);
    }
});

const uploadFileAWS = (file) => {
  const fileContent = fs.readFileSync(file.tempFilePath);

  const params = {
    Bucket: BUCKET_NAME,
    Key: file.name, 
    Body: fileContent,
    ACL:'public-read'
  };

  s3.upload(params, function(err, data) {
    if (err) {
        throw err;
      }
    console.log(`File uploaded successfully`);
  });
};

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  };


routerProduct.get('/', (req, res) => {
  ProductSchema.find({}, function(err, items) {
    res.send(items);  
  });
})

routerProduct.post('/create', (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No files were uploaded" });
    }
    const file = req.files.file;
    // 1024 * 1024 meaning  > 1mb
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File must < 1mb" });
    }

    // only image
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res
        .status(400)
        .json({ msg: "File format is incorrect (jpg,jpeg,png) " });
    }

    // s3
    uploadFileAWS(file)
    removeTmp(file.tempFilePath);

  } catch (err) {
    res.status(500).json({ msg: err.message });
    return;
  }


  s3.listObjects({Bucket : 'myphoto-q'}, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      const href = 'https://myphoto-q.s3.us-west-1.amazonaws.com/';
      const photoUrl = href + encodeURIComponent(req.files.file.name);

      const productSchema = new ProductSchema(req.body);
      productSchema.images = photoUrl

      productSchema
          .save()
          .then((productSchema) => {
              res.status(200).json(productSchema);
          })
          .catch((err) => {
              res.status(400).send('create product faled')
          })
    }
  });
})

module.exports = routerProduct