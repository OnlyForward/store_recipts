const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const routes = require('./routes');
const multer = require('multer');
const Recipe = require('./models/Recipe');
const Step = require('./models/recipe_steps');
const sequelize = require('./utils/database');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const date = new Date();
    const stringdate = date.toISOString();
    // if (!fs.existsSync(`uploads/${stringdate}`)) {
    //   fs.mkdirSync(`uploads/${stringdate}`);
    // }
    // fs.mkdirSync(`uploads/${file.fieldname}`, (err) => {
    //   console.log(err);
    // })
    console.log(`i can get title ${req.title} or ${req.body.title}`);
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    let date = new Date();
    let data = date.toISOString().split(":").join("").split(".").join("").toString();
    console.log(data);
    cb(null, data + "-" + file.originalname);
  }
})


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).fields([
  { name: 'imageUrl_step' },
  { name: 'imageUrl' }
]);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


console.log(path.join(__dirname, "views"));

app.use('/', routes);



Step.belongsTo(Recipe, { constrains: true, onDelete: 'CASCADE' });
Recipe.hasMany(Step);

//{ force: true }
sequelize.sync().then(result => {
  console.log('table products was created');
  app.listen(3000);
}).catch(err => console.log(err));