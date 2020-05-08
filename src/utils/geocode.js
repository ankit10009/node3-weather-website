const request= require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5raXQxMDAwOSIsImEiOiJjazl2dzM0cDIwMXZxM2VwMmk0bXlmMHdsIn0.0CQXrnPhOBFlp3IYsFeKEw&limit=1'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services',undefined)
        } else if(body.features.length===0) {
            callback('Unable to Fetch Location',undefined)
        }else {
        callback(undefined,{
            place_name: body.features[0].place_name,
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            })
        
        }
    } )
}

module.exports=geocode