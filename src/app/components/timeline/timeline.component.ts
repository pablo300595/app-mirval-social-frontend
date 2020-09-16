import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from './../../common-services/db-requests/user/user.service';
import { PostModel } from './../../models/post.model';
import { GLOBAL_CONFIG } from './../../configurations/global.config';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass'],
  providers: [UserService]
})
export class TimelineComponent implements OnInit {
  public identity;
  public token;
  public title: string;
  public url: string;
 
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { 
    this.identity = this.userService.getIdendity();
    this.token = this.userService.getToken();
    this.title = 'Timeline';
    this.url = GLOBAL_CONFIG.url;
  }

  ngOnInit(): void {
  }

}
