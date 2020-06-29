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
}
