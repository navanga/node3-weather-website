const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Defin paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

console.log(viewsPath)
const app = express()
//process.env.PORT value will exist on heroku
const port = process.env.PORT || 3000

//Setup handlebars engine
app.set('view engine', 'hbs')
//The views directory that handlebars will look for
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Navanga'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Navanga'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Node JS is awesome!!!',
        title: 'Help',
        name: 'Navanga'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide aaddress'
        })
    }

    geoCode(req.query.address, (error, {longtitude, latitude, location} = {}) => {
        if(error) {
            return res.send({error: error})
        }
     
        forecast(longtitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({error: error})
            }
    
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
           
          })
    })



    // res.send({
    //     location: 'Sydney',
    //     forecast: '22',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        errorMessage: 'Help article not found',
        name: 'Navanga'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        errorMessage: 'Page Not Found',
        name: 'Navanga'
    })
})

//port 3000
app.listen(port, ()=>{
    console.log('Server has started on port ' + port)
})