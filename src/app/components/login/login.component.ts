import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserModel } from './../../models/user.model';
import { UserService } from './../../common-services/db-requests/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: UserModel;
  public status: string;
  public identity;
  public token;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router) { 
      this.title = 'Log in';
      this.user = new UserModel('',  '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
     this.userService.login(this.user).subscribe(res => {
      this.identity = res.user;
        if(!this.identity || !this.identity._id) this.status = 'failure';
        else {
          // PERSIST DATA
          localStorage.setItem('identity', JSON.stringify(this.identity));
          // GET Token
          this.getToken();
        }
     }, err => {
       console.log(err);
       if(err != null) {
         this.status = 'failure';
       }
     });
  }

  getToken(): void {
    this.userService.login(this.user, true).subscribe(res => {
      this.token = res.token;
        if(this.token.length <= 0) this.status = 'failure';
        else {
          // PERSIST DATA
          localStorage.setItem('token', JSON.stringify(this.token));
          // GET User Analytics
          this.getAnalytics();
          this.router.navigate(['/']);
        }
     }, err => {
       console.log(err);
       if(err != null) {
         this.status = 'failure';
       }
     });
  }

  getAnalytics() {
    this.userService.getAnalytics().subscribe(res =>{
      console.log(res);
      localStorage.setItem('auth-user-analytics', JSON.stringify(res));
      this.status = 'success';
    }, err => {
      console.log(err);
    });
  }
}
