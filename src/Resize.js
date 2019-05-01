const sharp = require("sharp");
const path = require("path");
const v4 = require("uuid");
const AWS = require("aws-sdk");
const fs = require("fs");

class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  async save(buffer) {
    const images = [
      {
        size: 720,
        type: "origin",
        name: `origin.png`
      },
      {
        size: 150,
        type: "thumbnail",
        name: `thumbnail.png`
      }
    ];
    const resize = images =>
      sharp(buffer)
        .resize(images.size, images.size)
        .toFile(`${this.folder}/${images.type}/${images.name}`);

    const s3 = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
    });
    Promise.all(images.map(resize))
      .then(
        images.forEach(image => {
          const file = `${this.folder}/${image.type}/${image.name}`;
          const filePath = fs.createReadStream(file);
          var params = {
            Bucket: "rembr",
            Body: filePath,
            Key: `${image.type}/` + path.basename(file)
          };
          s3.upload(params, (err, data) => {
            if (err) {
              console.log("something went wrong");
            }
            if (data) {
              console.log("uploaded in :" + data.Location);
            }
          });
        })
      )
      .catch(err => {
        throw new Error("invalid request");
      });
    return images;
  }
}

module.exports = Resize;
