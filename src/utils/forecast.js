//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request= require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aca1185bfbc1180150d201a8ccffe72d&query=' + latitude + ','+ longitude +'&units=f'
    request({ url, json:true}, (error,{body})=> {
        if(error)
            callback('Unable to connect to Weather Service',undefined)
        else if (body.error)
        callback('Unable to find Location!',undefined)
        else    
            callback(undefined, (body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out and there is ' + body.current.precip + '% chance of rain'))
    })
}

module.exports=forecast