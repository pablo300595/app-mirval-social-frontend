import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from './../../common-services/db-requests/user/user.service';
import { PostService } from './../../common-services/db-requests/post/post.service';
import { PostModel } from './../../models/post.model';
import { GLOBAL_CONFIG } from './../../configurations/global.config';
import { Route } from '@angular/compiler/src/core';
// import { $ } from 'protractor';
import * as $ from 'jquery';

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
  public status;
  public page;
  public posts: PostModel[];
  public total;
  public pages;
  public itemsPerPage;
  public noMore;
 
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
    private postService: PostService) { 
    this.identity = this.userService.getIdendity();
    this.token = this.userService.getToken();
    this.title = 'Timeline';
    this.url = GLOBAL_CONFIG.url;
    this.page = 1;
    this.noMore = false;
  }

  ngOnInit(): void {
    this.getPosts(this.page)
  }

  getPosts(page, adding = false): void {
    this.postService.getPosts(this.token, page).subscribe(res => {
      console.log(res);
      this.total = res.total_items;
      this.pages = res.pages;
      this.itemsPerPage = res.items_per_page;
      if(res.posts) {
        if(!adding) {
          this.posts = res.posts;
        } else {
          let arrA = this.posts;
          let arrB = res.posts;
          this.posts = arrA.concat(arrB);

          $('html, body').animate({scrollTop: $('body').prop('scrollHeight')}, 500);
        }
        
        if(page > this.pages) {
          //this.router.navigate(['/home'])
        }
      } else  {
        this.status = 'error';
      }
    }, err => {
      let errorMessage = <any> err;
      if(errorMessage != null) {
        this.status = 'error';
      }
    });
  }

  viewMore() {
    if(this.posts.length == (this.total)) {
      this.noMore = true;
    } else {
      this.page += 1;
    }

    this.getPosts(this.page, true);
  }

  refreshPosts(event) {
    console.log(event);
    this.getPosts(1);
  }

}
