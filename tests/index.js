const darksky = require("../index.js")

try {
    darksky.forecast(44, 55).then(res => {
        let currentTemp = res.currently.apparentTemperature;
        console.log(`It currently feels like ${currentTemp} degrees Celcius outside.`)
    })
} catch (e) {
    console.error(e)
}