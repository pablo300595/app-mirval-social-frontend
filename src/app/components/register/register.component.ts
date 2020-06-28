import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserModel } from './../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public user: UserModel;
  public title = 'register';
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,

    ) {
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

}
