const path =require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname,'../templates/partials'));

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) =>{
  res.render('index',{
    title: "Weather",
    name: "BZ"
  })
})

app.get('/about', (req, res) =>{
  res.render('about',{
    title: "ABOUT!",
    name: "BZ"
  })
})

app.get('/help', (req, res) =>{
  res.render('help',{
    title: "HELP!",
    name: "BZ"
  })
})

app.get('/weather', (req, res) =>{
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address,(error, data)=>{
    if(error){
      return res.send({error: error});
    }
    forecast(data.latitude, data.longitude, (error, foreCastData) => {
      if(error){
        return res.send({error: error});
      }
      res.send({
        location: data.place_name,
        description: foreCastData.description[0],
        temprature: foreCastData.temprature,
        feelslike: foreCastData.feelslike,
        wind_speed: foreCastData.wind_speed,
        cloudcover: foreCastData.cloudcover,
        precip: foreCastData.precip,
        humidity: foreCastData.humidity,
        visibility: foreCastData.visibility,
      })
    })
  })
})

app.get('*', (req, res) =>{
  res.render('404',{
    title: "404",
    name: "BZ"
  });
})

app.listen(port, ()=>{
  console.log("Server is up and running on port " + port);
})
