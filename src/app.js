const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forcast');

const app = express();

//define paths for express config
const publicDirpath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and vews location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(publicDirpath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'benz'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'benz',
    message: 'Hello'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'benz',
    imgUrl:
      'https://myhero.com/images/guest/g17293/hero17207/g17293_u13968_spiderman.jpg'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you have to specify address'
    });
  }
  geocode(req.query.address, (error,{ latitude, longtitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longtitude, (error, forcastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forcast: forcastData,
        location,
        search_value: req.query.address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'benz',
    errorMsg: 'Article not found.'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'benz',
    errorMsg: 'Page not found.'
  });
});

app.listen(3000, () => {
  console.log('Server is on port 3000');
});
