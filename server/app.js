const express = require('express');
const app = express();
const fs = require('fs');
const config = require('./config/config');
var cors = require('cors');
var path = require('path');

app.listen(process.env.PORT, (err, resp) => {
    console.log(`Server start on port ${process.env.PORT}`)
});

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/devTypos/dist/devTypos')));

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
    fs.readFile('../client/devTypos/dist/devTypos/index.html', (err, response) => {
        if (err) {
            console.log(err)
            throw new Error(err)
        }
        res.write(response);
        res.end();
    });
});

app.get('/:id', (req, res) => {
    let html;
    fs.readFile(`../client/devTypos/dist/devTypos/${req.params.id}`, (err, response) => {
        if (err) {
            console.log(err)
            throw new Error(err)
        }
        // var charset = mime.charsets.lookup(type);
        // res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
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
