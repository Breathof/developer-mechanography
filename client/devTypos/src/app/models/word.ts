export class Word {
  public word: string;
  private isCorrect: boolean = false;
  private isError: boolean = false;
  private isCurrent: boolean = false;

  constructor(word: string) {
    this.word = word;
  }

  public setCorrect(value = true) {
    this.isCorrect = value;
  }

  public setError(value = true) {
    this.isError = value;
  }

  public setCurrent(value = true) {
    this.isCurrent = value;
  }

  getCorrect = () => this.isCorrect;

  getError = () => this.isError;

  getCurrent = () => this.isCurrent;
}
