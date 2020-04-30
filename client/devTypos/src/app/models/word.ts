export class Word {
  public word: string;
  private isCorrect: boolean = false;
  private isError: boolean = false;

  constructor(word: string) {
    this.word = word;
  }

  public setCorrect(value = true) {
    this.isCorrect = value;
  }

  public setError(value = true) {
    this.isError = value;
  }

  getCorrect = () => this.isCorrect;

  getError = () => this.isError;

}
