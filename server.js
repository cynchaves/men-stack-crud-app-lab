const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
};
connect();

const Planet = require('./models/planet.js');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/planets', async (req, res) => {
    const allPlanets = await Planet.find();
    res.send('Hola!');
});

app.get('/planets/new', (req, res) => {
    res.render('planets/new.ejs');
});

app.post('/planets', async (req, res) => {
    if (req.body.isLargerThanEarth === 'yes') {
        req.body.isLargerThanEarth = true;
    }
    else {
        req.body.isLargerThanEarth = false;
    };
    await Planet.create(req.body);
    res.redirect('/planets/new');
});







app.listen(3000, () => {
    console.log("Listening on port 3000");
  });