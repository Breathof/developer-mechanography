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

  getJavascript(): Observable<any> {
    return this.http.get(`${this.serverUrl}test?language=javascript`);
  }

  getPython(): Observable<any> {
    return this.http.get(`${this.serverUrl}test?language=python`);
  }

  getCss(): Observable<any> {
    return this.http.get(`${this.serverUrl}test?language=css`);
  }

  getHtml(): Observable<any> {
    return this.http.get(`${this.serverUrl}test?language=html`);
  }

  getJava(): Observable<any> {
    return this.http.get(`${this.serverUrl}test?language=java`);
  }

  getCSharp(): Observable<any> {
    return this.http.get(`${this.serverUrl}test?language=csharp`);
  }
}
