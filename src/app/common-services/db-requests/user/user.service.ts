import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './../../../models/user.model';
import { GLOBAL_CONFIG } from './../../../configurations/global.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  identity: any;
  token: any;
  analytics: any;

  constructor(private http: HttpClient) { 
    this.init();
  }

  init() {
    this.url = GLOBAL_CONFIG.url;
  }

  register(user: UserModel): Observable<any> {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(this.url+'register', body, {headers: headers});
  }

  login(user: UserModel, gettoken = null): Observable<any> {
    if(gettoken != null) {
      user.gettoken = gettoken;
    }
    let body = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    
    return this.http.post(`${this.url}login`, body, {headers: headers});
  }

  getIdendity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != undefined) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken(): string {
    let token = localStorage.getItem('token');

    if(token != undefined) {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  getAnalyticsBySession() {
    let analytics = JSON.parse(localStorage.getItem('auth-user-analytics'));

    if(analytics != undefined) {
      this.analytics = analytics;
    } else  {
      this.analytics = null;
    }

    return this.analytics;
  }

  getAnalytics(userId = null): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', this.getToken());
    if(userId != null) {
      return this.http.get(`${this.url}get-analytics`, {headers: headers});
    } else {
      return this.http.get(`${this.url}get-analytics`, {headers: headers});
    }
  }

  updateUser(user: UserModel): Observable<any> {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', this.getToken());
    return this.http.put(`${this.url}update-user/${user._id}`, body, {headers});
  }
}
