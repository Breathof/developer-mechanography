import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { LeaderBoardService } from '../../services/leader-board.service';
import { UserScore } from '../../models/userScore';
import { LanguageScore } from 'src/app/models/languageScore';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  languageScores: Array<LanguageScore> = new Array<LanguageScore>();

  javascriptScores: Array<UserScore> = new Array<UserScore>();
  pythonScores: Array<UserScore> = new Array<UserScore>();
  csharptScores: Array<UserScore> = new Array<UserScore>();
  javaScores: Array<UserScore> = new Array<UserScore>();
  htmlScores: Array<UserScore> = new Array<UserScore>();
  cssScores: Array<UserScore> = new Array<UserScore>();

  constructor(
    private userService: UserServiceService,
    private leaderBoardService: LeaderBoardService
  ) { }

  ngOnInit(): void {
    this.getLeaderBoard();
  }
  getLeaderBoard = () => {
    this.leaderBoardService.getLeaderBoard().subscribe(response => {
      this.languageScores = response;

      this.javascriptScores = this.languageScores.find(x => x.name === 'javascript')?.data;
      this.javaScores = this.languageScores.find(x => x.name === 'java')?.data;
      this.pythonScores = this.languageScores.find(x => x.name === 'python')?.data;
      this.csharptScores = this.languageScores.find(x => x.name === 'csharp')?.data;
      this.htmlScores = this.languageScores.find(x => x.name === 'html')?.data;
      this.cssScores = this.languageScores.find(x => x.name === 'css')?.data;
    });
  }
}
