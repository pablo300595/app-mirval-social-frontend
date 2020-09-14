import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './../../../models/user.model';
import { GLOBAL_CONFIG } from './../../../configurations/global.config';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public url: string;
  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.url = GLOBAL_CONFIG.url;
  }

  addFollow(token, follow): Observable<any> {
    let params = JSON.stringify(follow);
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', token);
    return this.http.post(`${this.url}follow`, params, {headers: headers});
  }

  deleteFollow(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', token);
    return this.http.delete(`${this.url}unfollow/${id}`, {headers: headers});
  }
}
