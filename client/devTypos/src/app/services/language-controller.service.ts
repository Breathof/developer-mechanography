import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageControllerService {

  serverUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getJS(): Observable<any> {
    return this.http.get(this.serverUrl + 'js');
  }

}
