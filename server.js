const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./models');

const Item = db.Item;
const port = process.env.PORT || 3000;

const app = express();

const ITEM_IMAGES_STUB = 'images/items';
const TMP_UPLDS_IMG_STUB = 'tmp/uploads/images/';

const upload = multer({
  dest: TMP_UPLDS_IMG_STUB,
  limits: { fileSize: 2000000 },
  files: 1
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/items', upload.single('image'), (req, res) => {
  const { description, price } = req.body;
  const { originalname, path: tmpPath } = req.file;
  fileName = originalname.replace(/\s+/g, '_');

  return Item.create({
      description: description,
      price: price
    })
    .then(newItem => {
      const idStr = newItem.id.toString();
      return moveImageUpload(idStr, fileName, tmpPath, ITEM_IMAGES_STUB)
        .then(imagePath => {
          return newItem.update({
            url: imagePath
          })
          .catch(err => {
            throw err;
          });
        });
    })
    .then(updatedItem => res.json(updatedItem))
    .catch(err => {
      res.json({ Error: err.message });
    });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  db.sequelize.sync({ force: true });
});

function moveImageUpload(idStr, fileName, tmpFilePath, targetStub) {
  return new Promise((resolve, reject) => {
    const targetPathStub = path.join(targetStub, idStr);
    const targetPathFull = path.join(__dirname, 'public', targetPathStub);
    const sourcePathFull = path.join(__dirname, tmpFilePath);
  
    fs.mkdir(targetPathFull, (err) => {
      if(err && err.code !== 'EEXIST'){
        reject(err);
      }
      fs.rename(sourcePathFull, path.join(targetPathFull, fileName), (err) => {
        if(err) reject(err);
        resolve(path.join(targetPathStub, fileName));
      });
    });
  });
}
