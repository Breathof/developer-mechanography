import { Injectable } from '@angular/core';
import { WordsPerMinute } from '../models/wpm';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  serverUrl = environment.API_URL;
  userName: string = 'Unknown';
  constructor(
    private http: HttpClient
  ) { }

  setUserName = (userName: string) => {
    console.log('Set userName: ', userName);

    this.userName = userName;
  }

  getName = (): string => { return this.userName };

  sendScore = (wpm: WordsPerMinute): Observable<any> => {
    console.log('SEND: ', { "userName": this.userName, "wpm": wpm.getWpm() });
    return this.http.post(`${this.serverUrl}userScore`, { "userName": this.userName, "wpm": wpm.getWpm() })
  }

}
