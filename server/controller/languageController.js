const express = require('express');
const app = express();
const bodyParser = require('body-parser')

let language = [];

app.get('../data/words.json');

const load = () => { language = require('../data/words.json') }

const getLanguage = (topNumber) => {
    load();
    let topResults = new Array();
    language = language.slice(0, topNumber);
    for (let index = 0; index < topNumber; index++) {
        topResults.push(language[Math.round(Math.random() * topNumber)]);
    }
    return topResults;
}

module.exports = {
    getLanguage
}