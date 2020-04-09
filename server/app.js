const express = require('express');
const app = express();
const config = require('./config/config');
app.listen(process.env.PORT, (err, resp) => {
    console.log(`Server start on port ${process.env.PORT}`)
})

const LanguageController = require('./controller/languageController');

app.get('/js', (req, res) => {
    try {
        res.status = 200;
        res.json(LanguageController.getLanguage());
    } catch (error) {
        console.error(error)
    }
});

