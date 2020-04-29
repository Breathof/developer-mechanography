import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { LeaderBoardService } from '../../services/leader-board.service';
import { UserScore } from '../../models/userScore';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  userScores: Array<UserScore> = new Array<UserScore>();

  constructor(
    private userService: UserServiceService,
    private leaderBoardService: LeaderBoardService
  ) { }

  ngOnInit(): void {
    this.getLeaderBoard();
  }
  getLeaderBoard = () => {
    console.log("Send req");

    this.leaderBoardService.getLeaderBoard().subscribe(response => {
      this.userScores = response;
      console.log(response);
    });
  }
}
