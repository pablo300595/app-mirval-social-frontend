import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserModel } from './../../models/user.model';
import { FollowModel } from './../../models/follow.model';
import { UserService } from './../../common-services/db-requests/user/user.service';
import { FollowService } from './../../common-services/db-requests/follow/follow.service';
import { GLOBAL_CONFIG } from './../../configurations/global.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {
  public title: string;
  public user: UserModel;
  public status: string;
  public identity;
  public token;
  public stats;
  public url;
  public follow;

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService, private followService: FollowService) { 
      this.title = 'Perfil';
      this.identity = this.userService.getIdendity();
      this.token = this.userService.getToken();
      this.url = GLOBAL_CONFIG.url;
     }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
    });
  }

  getUser(id) {
    this.userService.getUser(id).subscribe(res => {
      if(res.user){
        this.user = res.user;
      } else {
        this.status = 'error';
      }
    }, err => {
      console.log(err);
      this.router.navigate(['/profile', this.identity._id]);
    });
  }

  getCounters(id) {
    this.userService.getAnalytics(id).subscribe(res => {
      this.stats = res;
    }, err => {
      console.log(err);
    });
  }

}
