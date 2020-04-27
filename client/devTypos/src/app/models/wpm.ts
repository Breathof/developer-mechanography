import { Word } from './word';
export class WordsPerMinute {
  public rowLength = 40;
  public wordList: string[] = new Array<string>();
  public firstRowWordList: Word[] = new Array<Word>();
  public secondRowWordList: Word[] = new Array<Word>();
  public correctWords: string[] = new Array<string>();
  public errorWords: string[] = new Array<string>();
  public minutes: number = 1;
  public wpm: number;

  public getWpm(): number {
    let result = 0;
    this.correctWords.forEach(x => result += x.length);
    return (result / 5) / this.minutes;
  }

  public setRowLists(setFirstRow: boolean = true) {
    let lengthFirstRow = 0;
    let lengthSecondRow = 0;
    let words = this.wordList;

    if (setFirstRow) {
      while (lengthFirstRow < this.rowLength) {
        this.firstRowWordList.unshift(new Word(words.shift()));
        lengthFirstRow += this.firstRowWordList[0].word.length;
      }
    } else {
      this.firstRowWordList = new Array<Word>();
      this.secondRowWordList.forEach(x =>
        this.firstRowWordList.push(new Word(x.word))
      );
    }
    this.secondRowWordList = new Array<Word>();
    while (lengthSecondRow < this.rowLength) {
      this.secondRowWordList.unshift(new Word(words.shift()));
      lengthSecondRow += this.secondRowWordList[0].word.length;
    }

  }

  public shuffle() {
    var j, x, i;
    for (i = this.wordList.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.wordList[i];
      this.wordList[i] = this.wordList[j];
      this.wordList[j] = x;
    }
  }

  public init() {
    this.shuffle();
    this.setRowLists();
  }

}
