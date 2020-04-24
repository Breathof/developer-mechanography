import { Component, OnInit } from '@angular/core';
import { WordsPerMinute } from '../../models/wpm';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  wpm: WordsPerMinute = new WordsPerMinute();
  typedWord: string;

  constructor() { }

  ngOnInit(): void {

  }

  checkWord(event: any) {
    let word = this.typedWord.trim();
    this.typedWord = '';
    console.log(word);

    // let actualWord: string;
    // actualWord = this.wpm.wordList.shift();
    // if (word === actualWord) {
    //   this.wpm.correctWords.unshift(actualWord);
    // } else {
    //   this.wpm.errorWords.unshift(actualWord);
    // }
  }

}
