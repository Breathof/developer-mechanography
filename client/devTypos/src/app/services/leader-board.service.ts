import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserScore } from '../models/userScore';
import { LanguageScore } from '../models/languageScore';

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardService {

  serverUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getLeaderBoard = (): Observable<LanguageScore[]> => {
    // const options = { responseType: 'text' as 'json' };
    return this.http.get<LanguageScore[]>(`${this.serverUrl}leaderBoard`);
  }
}
