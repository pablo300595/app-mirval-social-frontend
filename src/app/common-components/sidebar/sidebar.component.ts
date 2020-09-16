import { Component, OnInit } from '@angular/core';
import { UserService } from './../../common-services/db-requests/user/user.service';
import { PostService } from './../../common-services/db-requests/post/post.service';
import { GLOBAL_CONFIG } from './../../configurations/global.config';
import { PostModel } from './../../models/post.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public post: PostModel;

  constructor(private userService: UserService, private postService: PostService) {
    this.identity = this.userService.getIdendity();
    this.token = this.userService.getToken();
    this.stats = this.userService.getAnalyticsBySession();
    this.url = GLOBAL_CONFIG.url;
    this.post = new PostModel('', '', '', '', this.identity._id);
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.postService.addPost(this.token, this.post).subscribe(res => {
      if(res.post) {
        // this.post = res.post;
        this.status = 'success';
        form.reset();
      } else {
        this.status = 'error';
      }
    }, err => {
      let errorMessage = <any> err;
      if(errorMessage != null) {
        this.status = 'error';
      }
    });
  }

}
