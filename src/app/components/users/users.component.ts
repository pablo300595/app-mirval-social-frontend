import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserModel } from './../../models/user.model';
import { FollowModel } from './../../models/follow.model';
import { UserService } from './../../common-services/db-requests/user/user.service';
import { FollowService } from './../../common-services/db-requests/follow/follow.service';
import { GLOBAL_CONFIG } from './../../configurations/global.config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  providers: [UserService, FollowService]
})
export class UsersComponent implements OnInit {
  public title: string;
  public identity;
  public token: string;
  public page: number;
  public nextPage: number;
  public prevPage: number;
  public status: string;
  public total;
  public pages;
  public users: UserModel[];
  public url: string;
  public follows;
  public followUserOver;

  constructor(private userService: UserService, private followService: FollowService,
    private route: ActivatedRoute, private router: Router) { 
    this.title = 'Gente'
    this.identity = this.userService.getIdendity();
    this.token = this.userService.getToken();
    this.url = GLOBAL_CONFIG.url;
  }

  ngOnInit(): void {
    this.actualPage();
  }

  actualPage() {
    this.route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;

      if(!params['page']) {
        page = 1;
      }

      if(!page) {
        page = 1;
      } else {
        this.nextPage = page + 1;
        this.prevPage = page - 1;

        if(this.prevPage <= 0) {
          this.prevPage = 1;
        }
      }
      // GET USER LIST
      this.getUsers(page);
    });
  }

  getUsers(page) {
    this.userService.getUsers(page).subscribe( res=> {
      if(!res.users) {
        this.status = 'error';
      } else {
        this.total = res.total;
        this.users = res.users;
        this.pages = res.pages;
        this.follows = res.usersIFollow;
        if(page > this.pages) {
          this.router.navigate(['/people', 1]);
        }
      }
    }, err => {
      let errorMessage = <any> err;
      console.log(errorMessage);
      if(errorMessage != null) {
        this.status = 'error';
      }
    });
  }

  mouseEnter(userId) {
    this.followUserOver = userId;
  }

  mouseLeave(userId) {
    this.followUserOver = 0;
  }

  followUser(followed) {
    let follow = new FollowModel('', this.identity._id, followed);

    this.followService.addFollow(this.token, follow).subscribe(res => {
      if(!res.follow) {
        this.status = 'error';
      } else {
        this.status = 'success';
        this.follows.push(followed);
      }
    }, err => {
      let errorMessage = <any> err;
      console.log(errorMessage);
      if(errorMessage != null) {
        this.status = 'error';
      }
    });
  }

  unfollowUser(followed) {
    this.followService.deleteFollow(this.token, followed).subscribe(res => {
      let search = this.follows.indexOf(followed);
      if(search != -1) {
        this.follows.splice(search, 1);
      }
    }, err => {
      let errorMessage = <any> err;
      console.log(errorMessage);
      if(errorMessage != null) {
        this.status = 'error';
      }
    });
  }

}
