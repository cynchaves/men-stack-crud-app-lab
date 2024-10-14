const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
};

connect();

const Planet = require('./models/planet.js');

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/planets', async (req, res) => {
    const allPlanets = await Planet.find();
    res.render('planets/index.ejs', {planets: allPlanets});
});

app.get('/planets/new', (req, res) => {
    res.render('planets/new.ejs');
});

app.get('/planets/:planetId', async (req, res) => {
   const foundPlanet = await Planet.findById(req.params.planetId);
   res.render('planets/show.ejs', {planet: foundPlanet});
});

app.delete('/planets/:planetId', async (req, res) => {
    const deletedPlanet = await Planet.findByIdAndDelete(req.params.planetId);
    res.redirect('/planets');
})

app.post('/planets', async (req, res) => {
    if (req.body.isLargerThanEarth === 'yes') {
        req.body.isLargerThanEarth = true;
    }
    else {
        req.body.isLargerThanEarth = false;
    };
    await Planet.create(req.body);
    res.redirect('/planets');
});

app.get('/planets/:planetId/edit', async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    console.log(foundPlanet);
    res.render('planets/edit.ejs', {planet: foundPlanet});
  });
  
app.put('/planets/:planetId', async (req, res) => {
    if (req.body.isLargerThanEarth === 'yes') {
        req.body.isLargerThanEarth = true;
    }
    else {
        req.body.isLargerThanEarth = false;
    }
    await Planet.findByIdAndUpdate(req.params.planetId, req.body);
    res.redirect(`/planets/${req.params.planetId}`);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });