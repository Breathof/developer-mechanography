var wordList = [];
var words = document.getElementById("words");
var inputElement = document.getElementById("input");
var correctElement = document.getElementById("correct");
var errorElement = document.getElementById("error");

var errors = 0;
var corrects = 0;

(function () {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            wordList = JSON.parse(xmlHttp.responseText);
            setElments(wordList);
        }
    };
    xmlHttp.open("GET", 'http://localhost:3000/js', true);
    xmlHttp.send(null);
})();

const setElments = (json) => {
    let domElement;
    console.log(json)
    json.forEach(element => {
        domElement = document.createElement("P");
        domElement.innerText = element
        words.appendChild(domElement);
    });
    words.removeChild(words.childNodes[0]);
    console.log(words)
}

const checkWord = () => {
    inputElement.onkeydown = (e) => {
        if (e.keyCode == 32) {
            compareValue();
        }
    }
}

const compareValue = () => {
    let inputText = inputElement.value.trim();
    if (inputText != " " && inputText != "") {
        console.log(`${inputText} == ${wordList.slice(0, 1)}`)
        if (inputText == wordList.slice(0, 1)) {
            corrects += 1;
        } else {
            errors += 1
        }
        wordList.shift();
        words.removeChild(words.childNodes[0]);

        console.log(`Error: ${errors};   Correct: ${corrects}`)
        errorElement.innerHTML = `Error: ${errors}`;
        correctElement.innerHTML = `Correct: ${corrects}`;
    }
    inputElement.value = '';
}

checkWord();