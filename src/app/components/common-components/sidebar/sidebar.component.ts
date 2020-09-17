import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from './../../../common-services/db-requests/user/user.service';
import { PostService } from './../../../common-services/db-requests/post/post.service';
import { GLOBAL_CONFIG } from './../../../configurations/global.config';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostModel } from './../../../models/post.model';

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
  //Output
  @Output() sent = new EventEmitter(); 

  constructor(private userService: UserService, private postService: PostService, 
    private route: ActivatedRoute, 
    private router: Router) {
    this.identity = this.userService.getIdendity();
    this.token = this.userService.getToken();
    this.stats = this.userService.getAnalyticsBySession();
    console.log('this.stats: ------------------------------------');
    console.log(this.stats);
    console.log('this.stats: ------------------------------------');
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
        this.router.navigate(['/timeline']);
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

  sendPost(event) {
    this.sent.emit({sent: true});
  }

}
