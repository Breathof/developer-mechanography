const express = require('express');
const app = express();
const fs = require('fs');
const config = require('./config/config');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')

app.listen(process.env.PORT, (err, resp) => {
    console.log(`Server start on port ${process.env.PORT}`)
});

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/devTypos/dist/devTypos')));
app.use(bodyParser.json())

const LanguageController = require('./controller/languageController');
const LeaderBoardController = require('./controller/leaderBoardController');

app.get('/test', (req, res) => {
    try {
        res.status = 200;
        let language = req.query.language;

        console.log(`Requested ${language}`);

        res.json(LanguageController.getLanguage(200, language));
    } catch (error) {
        console.error(error)
    }
});

app.get('/leaderBoard', (req, res) => {
    try {
        res.status = 200;
        res.json(LeaderBoardController.getLeaderBoard());
        // res.write(res);
        // console.log("Lederboard: ", LeaderBoardController.getLeaderBoard())
        res.end();
    } catch (error) {
        console.error(error)
    }
});

app.post('/userScore', (req, res) => {
    try {
        console.log('UserScore: ', req.body)
        res.status = 200;
        res.json(LeaderBoardController.updateLeaderBoard(req.body));
        // res.write(res);
        res.end();
    } catch (error) {
        console.error(error)
    }
});


app.get('/', (req, res) => {
    let html;
    fs.readFile('../client/devTypos/dist/devTypos/index.html', (err, response) => {
        if (err) {
            console.log(err)
            // throw new Error(err)
            return err;
        }
        res.write(response);
        res.end();
    });

});

// app.get('/:id', (req, res) => {
//     try {
//         fs.readFile(`../client/devTypos/dist/devTypos/${req.params.id}`, (err, response) => {
//             if (err) {
//                 console.log(err)
//                 return err
//             }
//             if (response) {
//                 res.write(response);
//             } else {
//                 getInitPage();
//             }
//             res.end();
//         });

//     } catch (error) {
//         console.error(error);
//     }
// });

app.all('*', (req, res) => {
    console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
    res.status(200).sendFile(path.join(__dirname, '../client/devTypos/dist/devTypos/index.html'));
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
