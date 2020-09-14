import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserModel } from "./../../models/user.model";
import { UserService } from "./../../common-services/db-requests/user/user.service";
import { UploadService } from "./../../common-services/file-operations/upload.service";
import { GLOBAL_CONFIG } from "./../../configurations/global.config";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass'],
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {
  public title: string;
  public user: UserModel;
  public identity;
  public token;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private uploadService: UploadService
  ) { 
    this.title = 'Actualizar mis datos';
    this.user = this.userService.getIdendity();
    this.identity = this.user;
    this.token = this.userService.getToken();
    this.url = GLOBAL_CONFIG.url;
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
        this.uploadService.makeFileRequest(this.url + 'upload-image-user/'+ this.user._id, [], this.filesToUpload, this.token, 'image').then((res: any) => {
          this.user.image = res.user.image;
          localStorage.setItem('identity', JSON.stringify(this.user));
        });
      }
    }, err => {
      console.log(err);
      if(err!=null) this.status = 'failure'
    });
  }

  fileChange(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files; 
  }
}
