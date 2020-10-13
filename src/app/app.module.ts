import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { HeaderComponent } from './components/common-components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/common-components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PostsComponent } from './components/common-components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChallengeComponent } from './components/challenge/challenge.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    HeaderComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PostsComponent,
    ProfileComponent,
    ChallengeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
