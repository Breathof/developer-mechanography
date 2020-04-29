const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path');

let leaderBoard = [];

app.get('../data/leaderBoard.json');

const load = () => { leaderBoard = require('../data/leaderBoard.json') }

const getLeaderBoard = () => {
    load();
    return leaderBoard;
}

const updateLeaderBoard = (json) => {
    load();
    // json = JSON.parse(JSON.stringify(json));
    leaderBoard.push(json);
    fs.writeFile(path.join(__dirname, '../data/leaderBoard.json'), JSON.stringify(leaderBoard), (err, data) => {
        if (err) console.log('error', err);
    });
}

module.exports = {
    getLeaderBoard,
    updateLeaderBoard
}