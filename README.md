# DarkScraper
Quickly scrape [Dark Sky](https://darksky.net). Powered by [Node Fetch](https://github.com/node-fetch/node-fetch) and [Cheerio](https://github.com/cheeriojs/cheerio).

```javascript
const darksky = require("darkscraper")

darksky.forecast(44, 55).then(res => {
        let currentTemp = res.currently.apparentTemperature;
        console.log(`It currently feels like ${currentTemp} degrees Celcius outside.`)
})
```

# API
See [API.md](API.md).