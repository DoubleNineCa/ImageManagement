const sharp = require("sharp");
const path = require("path");
const v4 = require("uuid");

class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  async save(buffer) {
    const images = [
      {
        size: 720,
        type: "origin",
        name: `origin_username_${v4()}`
      },
      {
        size: 150,
        type: "thumbnail",
        name: `thumbnail_username_${v4()}`
      }
    ];
    const resize = images =>
      sharp(buffer)
        .resize(images.size, images.size)
        .toFile(`${this.folder}/${images.type}/${images.name}.png`);

    Promise.all(images.map(resize)).catch(err => {
      throw new Error("invalid request");
    });
    return images;
  }
}

module.exports = Resize;
