/**
 * @file Dark Sky no longer has an official API, so we RIOT.
 * @author Kyle Anthony Williams <kyle.anthony.williams2@gmail.com>
 * @version 1.0.0
 * @todo Attempt to write documentation for `forecast` and `details`.
 * @todo Perhaps one day create TypeScript typings.
 */
const { URLSearchParams } = require("url"),
    fetch = require('node-fetch'),
    cheerio = require('cheerio'),
    { UNIT_CODES, LANGUAGE_CODES, TIME_FORMATS, DARK_SKY_DOMAIN } = require("./src/constants.js"),
    looseJsonParse = require("./src/util.js");

/**
 * Get the forecast of a coordinate pair.
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} [unit=si] What unit system you want to use. See lib.CONSTANTS.UNIT_CODES for more details.
 * @param {string} [lang=en] What language you want your forecast to be in. See lib.CONSTANTS.LANGUAGE_CODES for more details.
 * @param {number} [timeFormat=24] What time format you want your forecast in. Either 12-or-24-hour format.
 * @returns {object} An object containing forecast info.
 * @async
 */
module.exports.forecast = async function(latitude, longitude, unit = 'si', lang = "en", timeFormat = 24) {
    if (!Object.keys(UNIT_CODES).includes(unit))
        throw Error("Not a valid unit code. See lib.CONSTANTS.UNIT_CODES.");
    if (!Object.keys(LANGUAGE_CODES).includes(lang))
        throw Error("Not a valid language code. See lib.CONSTANTS.LANGUAGE_CODES.");
    if (!TIME_FORMATS.includes(timeFormat))
        throw Error("Not a valid time format. Either use the 12 or 24-hour format.");

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

/**
 * Get detailed info on the weather of a coordinate pair on a specific day.
 * @param {string|Date} date If you're using a string, the format is `yyyy-mm-dd`.
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {string} [unit=si] What unit system you want to use. See lib.CONSTANTS.UNIT_CODES for more details.
 * @param {string} [lang=en] What language you want your forecast to be in. See lib.CONSTANTS.LANGUAGE_CODES for more details.
 * @param {number} [timeFormat=24] What time format you want your forecast in. Either 12-or-24-hour format.
 * @returns {object} An object containing detailed info info.
 * @async
 */
module.exports.details = async function(date, latitude, longitude, unit = 'si', lang = "en", timeFormat = 24) {
    if (!Object.keys(UNIT_CODES).includes(unit))
        throw Error("Not a valid unit code. See lib.CONSTANTS.UNIT_CODES.");
    if (!Object.keys(LANGUAGE_CODES).includes(lang))
        throw Error("Not a valid language code. See lib.CONSTANTS.LANGUAGE_CODES.");
    if (!TIME_FORMATS.includes(timeFormat))
        throw Error("Not a valid time format. Either use the 12 or 24-hour format.");

    let formattedDate = typeof date == "Date" ? `${date.getFullYear()}-${date.getMonth}-${date.getDate()}` : date

    let url = DARK_SKY_DOMAIN;
    url.pathname = `/details/${latitude},${longitude}/${formattedDate}/${unit}${timeFormat}/${lang}`;
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

/**
 * Get search results for a place.
 * @param {string} query
 * @returns {object}  An array with search result objects.
 */
// {{displayLines: string[], coordinate: {latitude: number, longitude: number}, _completionUrl: string, urls: Array, administrativeArea: string, administrativeAreaCode: string, locality: string}[]}
module.exports.autocomplete = async function(query) {
    let url = DARK_SKY_DOMAIN;
    url.pathname = "/autocomplete";
    url.search = new URLSearchParams({ "query_string": query });
    let res = await fetch(url);
    return await res.json();
};

/**
 * Convert coordinates to the name of a place.
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {number} [hires=1] Actually have no idea what this does.
 * @returns {{name: string, street: string}} Name for the coordinates.
 */
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

/**
 * Convert the name of the place to coordinates.
 * @param {string} query The place you want to look up. (eg. "5878 CR-47, Munnsville, NY")
 * @returns {{latitude: number, longitude: string}} The coordinate pair.
 */
module.exports.geo = async function(query) {
    let url = DARK_SKY_DOMAIN;
    url.pathname = "/geo";
    url.search = new URLSearchParams({ "q": query });
    let res = await fetch(url)
    return await res.json()
};

/**
 * Constants related to Dark Sky discovered during the creation of this library.
 * @property {object}   UNIT_CODES     - All unit systems Dark Sky accepts.
 * @property {object}   LANGUAGE_CODES - All languages Dark Sky accepts.
 * @property {number[]} TIME_FORMATS   - All time formats Dark Sky accepts.
 * @constant
 * @readonly
 */
module.exports.CONSTANTS = {
    UNIT_CODES,
    LANGUAGE_CODES,
    TIME_FORMATS,
}