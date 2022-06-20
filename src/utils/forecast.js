const request = require('request');

const forecast = (latitude, longitude, callback)=>{
  const url = `http://api.weatherstack.com/current?access_key=0566fd55028fcef2ceedbffa92e136fe&units=m&query=${latitude},${longitude}`;
  request({url:url, json:true},(error,response)=>{
    if(error){
      callback('Unable to connect to weather services',undefined);
    }
    else if(response.body.success ===  false){
      callback('Co-ordinateas are entered in an incorrect manner',undefined);
    }
    else{
      callback(undefined,{
        temprature: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
        description: response.body.current.weather_descriptions,
        wind_speed: response.body.current.wind_speed,
        cloudcover: response.body.current.cloudcover,
        precip: response.body.current.precip,
        humidity: response.body.current.humidity,
        visibility: response.body.current.visibility,
      })
    }
  })
}

module.exports = forecast;
