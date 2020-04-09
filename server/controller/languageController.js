const express = require('express');
const app = express();
const bodyParser = require('body-parser')

let language = [];

app.get('../data/words.json');

const load = () => { language = require('../data/words.json') }

const getLanguage = () => {
    load();
    return language;
}

module.exports = {
    getLanguage
}