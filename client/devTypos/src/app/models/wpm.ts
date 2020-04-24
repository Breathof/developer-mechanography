export class WordsPerMinute {
  public wordList: string[] = new Array<string>();
  public correctWords: string[] = new Array<string>();
  public errorWords: string[] = new Array<string>();
  public minutes: number = 1;
  public wpm: number;

  public getWpm(): number {
    let result = 0;
    this.correctWords.forEach(x => result += x.length);
    return (result / 5) / this.minutes;
  }
}
