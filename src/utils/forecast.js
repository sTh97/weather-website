const request = require("request")
const dotenv = require('dotenv').config()

const forecast = (lat, long, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=` +encodeURIComponent(lat)+ `&lon=`+encodeURIComponent(long)+`&units=metric&appid=${process.env.API_KEY}`
    request({url, json:true}, (error, { body } ) => {
        if(error){
            callback('Unable to connect to weather app!', undefined)
        }else if(body.error){
           callback('Cant load the app. Try again later!', undefined)
        }
        else {
            callback(undefined, {
                description: "Description: " + body.daily[0].weather[0].description,
                temperature: " The temperature right now is: " + body.current.temp  + " degree Centigrade. But it feels like: " + body.current.feels_like + " degree Centigrade and weather is: " + body.current.weather[0].description,
            })
        }  
       })
}

module.exports = forecast