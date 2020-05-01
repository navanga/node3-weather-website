const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b7a30e5b632a42b1b4bb70fb22485434&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)
    request({url, json:true }, (error, response) => {
        
        if(error) {
            callback('Unable to connect to service');
        } else  if(response.body.error) {
            callback(response.body.error);
        } else {
            const data = response.body
            callback(undefined, {
                currentTemp: data.current.temperature,
                feelsLike: data.current.feelslike,
                description: data.current.weather_descriptions[0]
            })
        }
        
    })
}


module.exports = forecast