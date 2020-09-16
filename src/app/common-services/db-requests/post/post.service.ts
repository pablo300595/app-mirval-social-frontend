import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './../../../models/user.model';
import { GLOBAL_CONFIG } from './../../../configurations/global.config';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public url: string;
  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.url = GLOBAL_CONFIG.url;
  }

  addPost(token, post): Observable<any> {
    let params = JSON.stringify(post);
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', token);
    return this.http.post(`${this.url}post`, params, {headers: headers});
  }
}
