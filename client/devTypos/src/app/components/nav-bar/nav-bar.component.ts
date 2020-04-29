import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  userName: string = 'Unknown';

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

  setUserName = (event) => {
    this.userName = event.userName;
    this.userService.setUserName(this.userName);
    console.log(event);
  }


}
