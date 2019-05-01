const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
class ImageUpload {
  constructor(filename) {
    this.filename = filename;
  }

  upload() {
    const s3 = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
    });

    const fileName = "origin.png";
    const filePath = `${path.join(
      __dirname,
      "public/images/origin/" + fileName
    )}`;

    const file = fs.createReadStream(filePath);
    console.log(fs.existsSync(filePath));

    var params = {
      Bucket: "rembr",
      Body: file,
      Key: "folder/" + path.basename(filePath)
    };
    console.log(filePath);

    s3.upload(params, (err, data) => {
      if (err) {
        console.log("something went wrong");
      }
      if (data) {
        console.log("uploaded in :" + data.Location);
      }
    });
  }
}

module.exports = ImageUpload;
