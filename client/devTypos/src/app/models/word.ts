export class Word {
  public word: string;
  private isCorrect: boolean = false;
  private isError: boolean = false;

  constructor(word: string) {
    this.word = word;
  }

  public setCorrect() {
    this.isCorrect = true;
  }

  public setError() {
    this.isError = true;
  }

  getCorrect = () => this.isCorrect;

  getError = () => this.isError;

}
