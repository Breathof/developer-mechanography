import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WordsPerMinute } from '../../models/wpm';
import { LanguageControllerService } from '../../services/language-controller.service';
import { Word } from 'src/app/models/word';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

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
  finished = false;
  count: number = 60;
  wordIndex: number = 0;
  startDate: Date;
  counter: Observable<number>;
  resultWpm: string = '';

  @ViewChild('mainInput') mainInput: ElementRef;

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainInput.nativeElement.focus();
    }, 0);
  }

  checkWord(event: any) {
    this.updateList(this.isEqualWords());
    if (!this.started) {
      // this.initialize();
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
    if (!this.started) {
      this.startDate = new Date();
      this.countTimeLeft();
    }
    this.started = true;
  }

  countTimeLeft = () => {
    this.counter = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );

    this.counter.subscribe(() => {
      if (this.count == 0) {
        this.setResult();
      }
    })
  }

  reset() {
    location.reload();
  }

  setResult() {
    this.resultWpm = 'WPM: ' + this.wpm.getWpm();
    console.log(this.resultWpm);
    this.finished = true;
  }
}
