const { URL } = require('url')

module.exports.DARK_SKY_DOMAIN = new URL("https://darksky.net")

module.exports.TIME_FORMATS = [12, 24]

module.exports.UNIT_CODES = {
    "us": "F, mph",
    "si": "C, m/s",
    "ca": "C, km/h",
    "uk2": "C, mph"
}

module.exports.LANGUAGE_CODES = {
    "de": "Deutsch",
    "en": "English",
    "es": "Español",
    "fr": "Français",
    "it": "Italiano",
    "nl": "Nederlands",
    "tr": "Türk",
    "ar": "عربي",
    "zh": "中文",
    "ja": "日本語",
    "x-pig-latin": "Pig Latin"
}