const express = require('express');
const app = express();
const bodyParser = require('body-parser')

let language = [];

app.get('../data/words.json');

const load = (languageName) => { language = require(`../data/${languageName}-words.json`) }

const getLanguage = (topNumber, languageName = 'javascript') => {
    load(languageName);
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