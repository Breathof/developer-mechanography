import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageControllerService {

  serverUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  getJS(): Observable<any> {
    return this.http.get(`${this.serverUrl}js`);
  }

}
