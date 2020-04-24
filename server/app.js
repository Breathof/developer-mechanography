const express = require('express');
const app = express();
const fs = require('fs');
const config = require('./config/config');
var cors = require('cors');

app.listen(process.env.PORT, (err, resp) => {
    console.log(`Server start on port ${process.env.PORT}`)
});

app.use(cors());

const LanguageController = require('./controller/languageController');

app.get('/js', (req, res) => {
    try {
        res.status = 200;
        res.json(LanguageController.getLanguage());
    } catch (error) {
        console.error(error)
    }
});

app.get('/', (req, res) => {
    let html;
    fs.readFile('../client/index.html', (err, response) => {
        if (err) {
            throw new Error(err)
        }
        res.write(response);
        res.end();
    });
});

app.get('/index.js', (req, res) => {
    let html;
    fs.readFile('../client/index.js', (err, response) => {
        if (err) {
            throw new Error(err)
        }
        res.write(response);
        res.end();
    });
});
