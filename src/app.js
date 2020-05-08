const path= require('path')
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()

//Define Path for Express Configs
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Set up Handle Bar Engine and views Location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Set up Static Directory to serve
app.use(express.static(publicDirectoryPath))

// app.com
app.get('', (req, res)=>{
    res.render('index',{
        title: 'weather',
        name: 'Ankit Ladha'
    })
})

//app.com/about

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Ankit Ladha'
    })
})

//app.com/help

app.get('/help', (req, res)=>{
    res.render('help',{
        helpText: 'This is some Help',
        title: 'Help',
        name: 'Ankit Ladha'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
        return res.send({
            error: 'You must provide a valid Address'
        })

    geocode(req.query.address, (error,{ place_name , longitude, latitude} = {})=> {

        if(error)
            res.send({error})
        forecast(longitude,latitude, (error, forecastData) => {
        if(error)
            res.send({error})    
        res.send({location: place_name,forecast: forecastData,address: req.query.address})        
        })
    
    })      
    
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        errorText: 'Help Article not Found'
    })
})

app.get('*', (req,res)=>{
    res.render('error', {
        errorText: 'Page not Found'
    })
})

app.listen(port, () => {
    console.log('The Server is up on Port ' + port)
})