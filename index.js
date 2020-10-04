// Dark Sky no longer has an official API, so we RIOT.
const { URLSearchParams } = require("url"),
    fetch = require('node-fetch'),
    cheerio = require('cheerio'),
    { UNIT_CODES, LANGUAGE_CODES, TIME_FORMATS, DARK_SKY_DOMAIN } = require("./src/constants.js"),
    looseJsonParse = require("./src/util.js");

module.exports.forecast = async function(latitude, longitude, unit = 'si', lang = "en", timeFormat = 24) {
    // Argument checking
    if (!Object.keys(UNIT_CODES).includes(unit))
        throw Error("Not a valid unit code. See lib.UNIT_CODES.");
    if (!Object.keys(LANGUAGE_CODES).includes(lang))
        throw Error("Not a valid language code. See lib.LANGUAGE_CODES.");
    if (!TIME_FORMATS.includes(timeFormat))
        throw Error("Not a valid time format. Either use the 12 or 24-hour format.");

    // ACTUAL FUNCTIONS STARTS HERE
    let url = DARK_SKY_DOMAIN;
    url.pathname = `/forecast/${latitude},${longitude}/${unit}${timeFormat}/${lang}`;
    let res = await fetch(url),
        $ = cheerio.load(await res.text()),
        script = $("script").eq(-2).html(),
        dict = {};

    script.trim().split("var ")[1].split("\n").forEach(item => {
        let line = item.trim().split(" = ");
        dict[line[0]] = looseJsonParse(line[1].substring(0, line[1].length - 1));
    });

    return dict;
};

module.exports.details = async function(date, latitude, longitude, unit = 'si', lang = "en", timeFormat = 24) {
    // Argument checking
    if (!Object.keys(UNIT_CODES).includes(unit))
        throw Error("Not a valid unit code. See lib.UNIT_CODES.");
    if (!Object.keys(LANGUAGE_CODES).includes(lang))
        throw Error("Not a valid language code. See lib.LANGUAGE_CODES.");
    if (!TIME_FORMATS.includes(timeFormat))
        throw Error("Not a valid time format. Either use the 12 or 24-hour format.");

    // ACTUAL FUNCTIONS STARTS HERE    
    let url = DARK_SKY_DOMAIN;
    url.pathname = `/details/${latitude},${longitude}/${date}/${unit}${timeFormat}/${lang}`;
    let res = await fetch(url),
        $ = cheerio.load(await res.text()),
        script = $("script").eq(-2).html(),
        dict = {};

    script.trim().split("var ")[1].split("\n").forEach(item => {
        let line = item.trim().split(" = ");
        dict[line[0]] = looseJsonParse(line[1].substring(0, line[1].length - 1));
    });

    return dict;
};

module.exports.autocomplete = async function(query) {
    let url = DARK_SKY_DOMAIN;
    url.pathname = "/autocomplete";
    url.search = new URLSearchParams({ "query_string": query });
    let res = await fetch(url);
    return await res.json();
};

module.exports.rgeo = async function(latitude, longitude, hires = 1) {
    let url = DARK_SKY_DOMAIN;
    url.pathname = "/rgeo";
    url.search = new URLSearchParams({
        "lat": latitude,
        "lon": longitude,
        "hires": hires
    });
    let res = await fetch(url);
    return await res.json();
};

module.exports.geo = async function(query) {
    let url = DARK_SKY_DOMAIN;
    url.pathname = "/geo";
    url.search = new URLSearchParams({ "q": query });
    let res = await fetch(url)
    return await res.json()
};

module.exports.CONSTANTS = {
    UNIT_CODES,
    LANGUAGE_CODES,
    TIME_FORMATS,
}