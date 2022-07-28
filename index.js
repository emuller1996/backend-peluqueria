const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const multer = require("multer");
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/barberia')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use('/public', express.static('public'));
app.use(cors());

let Barbero = require("./models/barbero");
app.post("/image", upload.single("file"), function (req, res) {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.file);
  console.log(url);

  const barber = new Barbero({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    servicios: req.body.servicios,
    rol: req.body.rol,
    profileImg: url + "/public/images/" + req.file.filename,
  });
  barber
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Barber registered successfully!",
        userCreated: {
          _id: result._id,
          profileImg: result.profileImg,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

app.get("/barberos",function (req, res) {
Barbero.find().then(data => {
  res.status(200).json({
      barberos: data
  });
})
}

);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
