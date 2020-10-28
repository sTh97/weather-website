const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.use(express.static(publicDirectoryPath))

console.log(__dirname)
console.log(__filename)

app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        pageName: "Weather App",
        title: "Weather App",
        purpose: "To show the current weather",
        name: "Syed Taimoor Hasan"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        pageName: "About",
        title: "About page",
        name: "Syed Taimoor Hasan"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        pageName: "Help",
        title: "Help page.",
        purpose: "This page will show help contents",
        name: "Syed Taimoor Hasan"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "Address must be provided"
        })
    }
    geocode(req.query.search, (error, {Longitude, Latitude, location} = {}) => {
        if(error){
           return res.send({
                error: "something went wrong with an address"
            })
        }
        //res.send(location)
        forecast(Longitude, Latitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                forecastData,
                location,
              // req.query.search
            })
          }) 
    })
})



app.get('/help/*', (req, res) => {
    res.render('error404', {
        pageName: "Error404",
        title: 404,
        errorMessage: "Help article not found",
        name: "Syed Taimoor Hasan"
    })
})

app.get('*', (req, res) => {
    res.render('error404',{
        pageName: "Error404",
        title: 404,
        errorMessage: "Sorry Page Not Found",
        name: "Syed Taimoor Hasan"
    })
})

app.listen(port, () => {
    console.log('server is running')
})
