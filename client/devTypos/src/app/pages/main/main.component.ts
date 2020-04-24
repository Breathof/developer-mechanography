import { Component, OnInit } from '@angular/core';
import { WordsPerMinute } from '../../models/wpm';
import { LanguageControllerService } from '../../services/language-controller.service';
import { Word } from 'src/app/models/word';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  wpm: WordsPerMinute = new WordsPerMinute();
  typedWord: string;
  wordList: string[] = new Array<string>();
  started = false;
  timeLeft: number = 60;
  wordIndex: number = 0;
  constructor(private languageController: LanguageControllerService) { }

  ngOnInit(): void {
    this.languageController.getJS().subscribe(result => {
      console.log('Server: ', result);
      this.wpm.wordList = result;
      this.wordList = this.wpm.wordList;

      this.wpm.init();
      console.log(this.wpm.firstRowWordList);
    });

  }

  checkWord(event: any) {
    let word = this.typedWord.trim();
    if (this.typedWord != ' ') {
      let actualWord: Word = new Word("");
      actualWord = (this.wpm.firstRowWordList[this.wordIndex]);
      this.wordIndex++;
      if (word === actualWord.word) {
        this.wpm.correctWords.unshift(actualWord.word);
        actualWord.setCorrect();
      } else {
        this.wpm.errorWords.unshift(actualWord.word);
        actualWord.setError();
      }
    }
    this.typedWord = '';

    this.wordList.shift();
    console.log(this.wpm.firstRowWordList);

    if (!this.started)
      this.initialize();
  }

  initialize() {
    this.started = true;
  }

  reset() {

  }

  setResult() {

  }
}
