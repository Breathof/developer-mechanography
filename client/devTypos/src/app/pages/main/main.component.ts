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
    this.updateList(this.isEqualWords());
    if (!this.started) {
      this.initialize();
    }
    this.updateIndex();
  }

  private updateList(areWordsEquial: boolean) {
    let actualWord: Word = this.getActualWord();
    if (this.typedWord != ' ') {
      if (areWordsEquial) {
        this.wpm.correctWords.unshift(actualWord.word);
        actualWord.setCorrect();
      } else {
        this.wpm.errorWords.unshift(actualWord.word);
        actualWord.setError();
      }
    }

    console.log(this.wordIndex, this.wpm.firstRowWordList.length - 1)
    if (this.wordIndex === this.wpm.firstRowWordList.length - 1) {
      this.wpm.setRowLists(false);
      this.wordIndex = -1;
    }
    this.resetTypedWordAndWordList();
  }

  private resetTypedWordAndWordList = () => { this.typedWord = ''; this.wordList.shift(); }

  private isEqualWords(): boolean {
    if (this.typedWord != ' ') {
      return this.getTypedWord() === this.getActualWord()?.word;
    } else {
      return false;
    }
  }

  private getActualWord = () => this.wpm.firstRowWordList[this.wordIndex];

  private getTypedWord = () => this.typedWord.trim();

  private updateIndex = () => this.wordIndex = ++this.wordIndex;

  initialize() {
    this.started = true;
  }

  reset() {

  }

  setResult() {

  }
}
