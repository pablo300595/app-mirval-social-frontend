import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserModel } from './../../models/user.model';
import { UserService } from './../../common-services/db-requests/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: UserModel;
  public title: string;
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService

    ) {
      this.title = 'register';
      this.user = new UserModel(
        '',
        '',
        '',
        '',
        '',
        '',
        'ROLE_USER',
        '');
    }

  ngOnInit(): void {
  }

  onSubmit(registerForm): void {
    this.userService.register(this.user).subscribe(res => {
      if(res.user && res.user._id) {
        this.status = 'success';
        registerForm.reset();
      }
      else this.status = 'failure'
    }, err => {
      console.log(err);
    });
  }

}
