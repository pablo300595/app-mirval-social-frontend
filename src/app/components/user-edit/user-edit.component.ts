import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserModel } from "./../../models/user.model";
import { UserService } from "./../../common-services/db-requests/user/user.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public title: string;
  public user: UserModel;
  public identity;
  public token;
  public status: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { 
    this.title = 'Actualizar mis datos';
    this.user = this.userService.getIdendity();
    this.identity = this.user;
    this.token = this.userService.getToken()
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe(res => {
      if(!res.user) {
        this.status = 'failure';
      } else {
        this.status = 'success';
        localStorage.setItem('identity', JSON.stringify(this.user));
        this.identity = this.user;
        // UPLOAD IMAGE
      }
    }, err => {
      console.log(err);
      if(err!=null) this.status = 'failure'
    });
  }
}
