export class WordsPerMinute {
  public wordList: string[];
  public correctWords: string[];
  public errorWords: string[];
  public minutes: number = 1;
  public wpm: number;

  public getWpm(): number {
    let result = 0;
    this.correctWords.forEach(x => result += x.length);
    return (result / 5) / this.minutes;
  }
}
