import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WordsPerMinute } from '../../models/wpm';
import { LanguageControllerService } from '../../services/language-controller.service';
import { Word } from 'src/app/models/word';
import { Observable, timer, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { UserServiceService } from '../../services/user-service.service';
import { IfStmt } from '@angular/compiler';

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
  language = '';

  @ViewChild('mainInput') mainInput: ElementRef;
  counterSuscription: Subscription;

  constructor(
    private languageController: LanguageControllerService,
    private userService: UserServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.count = 60;
    this.wpm = new WordsPerMinute();
    this.wordList = new Array<string>();
    this.wordIndex = 0;

    this.route.queryParams.subscribe(params => {
      this.language = this.route.snapshot.paramMap.get("language");
      console.log('LANGUAGE', this.language);
      switch (this.language) {
        case 'javascript':
          this.languageController.getJavascript().subscribe(result => {
            this.wpm.wordList = result;
            this.wordList = this.wpm.wordList;
            this.wpm.init();
          });
          break;

        case 'python':
          this.languageController.getPython().subscribe(result => {
            this.wpm.wordList = result;
            this.wordList = this.wpm.wordList;
            this.wpm.init();
          });
          break;

        case 'csharp':
          this.languageController.getCSharp().subscribe(result => {
            this.wpm.wordList = result;
            this.wordList = this.wpm.wordList;
            this.wpm.init();
          });
          break;

        case 'java':
          this.languageController.getJava().subscribe(result => {
            this.wpm.wordList = result;
            this.wordList = this.wpm.wordList;
            this.wpm.init();
          });
          break;

        case 'html':
          this.languageController.getHtml().subscribe(result => {
            this.wpm.wordList = result;
            this.wordList = this.wpm.wordList;
            this.wpm.init();
          });
          break;

        case 'css':
          this.languageController.getCss().subscribe(result => {
            this.wpm.wordList = result;
            this.wordList = this.wpm.wordList;
            this.wpm.init();
          });
          break;
        default:
          this.languageController.getJavascript().subscribe(result => {
            this.wpm.wordList = result;
            this.wordList = this.wpm.wordList;
            this.wpm.init();
          });
          break;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainInput.nativeElement.focus();
    }, 0);
  }

  checkWord(event: any) {
    if (!this.finished) {
      if (event.code == "Space") {
        if (this.typedWord !== " ") {
          this.updateList(this.isEqualWords());
          this.updateIndex();
          this.getActualWord().setCurrent();
        } else {
          this.typedWord = "";
        }
      } else {
        let actualWord = this.getActualWord();
        const typedWord = this.getTypedWord();
        const length = typedWord.length;
        const error = typedWord === actualWord?.word?.slice(0, length);
        error ?
          actualWord.setError(false) :
          actualWord.setError(true);
      }
    }
  }

  private updateList(areWordsEquial: boolean) {
    let actualWord: Word = this.getActualWord();
    if (areWordsEquial) {
      this.wpm.correctWords.unshift(actualWord.word);
      actualWord.setCorrect();
    } else {
      this.wpm.errorWords.unshift(actualWord.word);
      actualWord.setError();
    }

    if (this.wordIndex === this.wpm.firstRowWordList.length - 1) {
      this.wpm.setRowLists(false);
      this.wordIndex = -1;
    }
    this.resetTypedWordAndWordList();
  }

  private resetTypedWordAndWordList = () => {
    this.typedWord = this.typedWord.split(" ")[1] === undefined ? '' : this.typedWord.split(" ")[1];
    this.wordList.shift();
  }

  private isEqualWords(): boolean {
    if (this.typedWord != ' ') {
      return this.getTypedWord() === this.getActualWord()?.word;
    } else {
      return false;
    }
  }

  private getActualWord = () => this.wpm.firstRowWordList[this.wordIndex];

  private getTypedWord = () => this.typedWord.split(" ")[0].trim();

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

    this.counterSuscription = this.counter.subscribe(() => {
      if (this.count == 0) {
        this.setResult();
      }
    })
  }

  reset() {
    this.started = false;
    this.finished = false;

    this.typedWord = '';
    this.ngOnInit();

    this.counterSuscription?.unsubscribe();
    this.mainInput.nativeElement.focus();
  }

  setResult() {
    this.resultWpm = 'WPM: ' + this.wpm.getWpm();
    this.finished = true;
    this.count = 60;

    console.log('setResult')
    if (this.userService.getName() !== 'Unknown') {
      this.userService.sendScore(this.wpm, this.language).subscribe(resp => {
        console.log(resp)
      });
    }

  }
}
