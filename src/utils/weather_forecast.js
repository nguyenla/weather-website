const request = require("request")

const weather_forecast = (longitude, latitude, callback) => {
    const access_key = "7e58099ead98955800826e80c72cfed4"
    const weather_url = "http://api.weatherstack.com/current?access_key=" + access_key 
        + "&query=" + latitude + "," + longitude
    
    request({url: weather_url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        }
        else if (body.error) {
            callback("Error: " + body.error.info, undefined)
        }
        else {
            console.log(body)
            callback(undefined, {
                description: body.current.weather_descriptions,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
            })
        }
    })
}

module.exports = weather_forecast