import { Component, OnInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { UserService } from './../../../common-services/db-requests/user/user.service';
import { PostService } from './../../../common-services/db-requests/post/post.service';
import { GLOBAL_CONFIG } from './../../../configurations/global.config';
import { SIDEBAR_CONFIG } from './config/sidebar.config';
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

  public isSidebarCollapsed: boolean;
  public deviceWidth: number;
  public deviceHeigh: number;
  public deviceType: string; 

  constructor(private userService: UserService, private postService: PostService, 
    private route: ActivatedRoute, 
    private router: Router) {
    this.identity = this.userService.getIdendity();
    this.token = this.userService.getToken();
    this.stats = this.userService.getAnalyticsBySession();
    this.init();
    /*console.log('this.stats: ------------------------------------');
    console.log(this.stats);
    console.log('this.stats: ------------------------------------');
    this.url = GLOBAL_CONFIG.url;
    this.post = new PostModel('', '', '', '', this.identity._id);*/
  }

  ngOnInit(): void {
  }

  init() {
    this.isSidebarCollapsed = SIDEBAR_CONFIG.isSidebarCollapsed;
    this.deviceWidth = window.innerWidth,
    this.deviceHeigh = window.innerHeight
    this.calculateDeviceType(this.deviceWidth);
    console.log('width: '+this.deviceWidth);
    console.log('height: '+this.deviceHeigh);
  }

  calculateDeviceType(width) {
    if(width >= 320 && width <= 767) {
      this.deviceType = 'mobile';
    } else if(width >= 768 && width <= 1279) {
      this.deviceType = 'tablet-laptopsm';
    } else {
      this.deviceType = 'laptoplg';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResizeScreenSize(event) {
    this.deviceHeigh = event.target.innerHeight;
    this.deviceWidth = event.target.innerWidth;
    this.calculateDeviceType(this.deviceWidth);
  }

  onSubmit(form) {
    /*this.postService.addPost(this.token, this.post).subscribe(res => {
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
    });*/
  }

  sendPost(event) {
    this.sent.emit({sent: true});
  }

}
