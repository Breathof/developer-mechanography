import { Component, OnInit } from '@angular/core';
import { WordsPerMinute } from '../../models/wpm';
import { LanguageControllerService } from '../../services/language-controller.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  wpm: WordsPerMinute = new WordsPerMinute();
  typedWord: string;
  wordList: string[] = new Array<string>();

  constructor(private languageController: LanguageControllerService) { }

  ngOnInit(): void {
    this.languageController.getJS().subscribe(result => {
      console.log('Server: ', result);
      this.wpm.wordList = result;
      this.wordList = this.wpm.wordList;
    });

  }

  checkWord(event: any) {
    let word = this.typedWord.trim();
    if (this.typedWord != ' ') {

      console.log(word);

      let actualWord: string;
      actualWord = this.wpm.wordList.shift();
      if (word === actualWord) {
        this.wpm.correctWords.unshift(actualWord);
      } else {
        this.wpm.errorWords.unshift(actualWord);
      }
    }
    this.typedWord = '';
    console.log('Corrects: ', this.wpm.correctWords.length);
    console.log('Errors: ', this.wpm.errorWords.length);
  }

  reset() {

  }

}
