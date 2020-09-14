import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './common-services/db-requests/user/user.service';
import { GLOBAL_CONFIG } from './configurations/global.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  public url;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.url = GLOBAL_CONFIG.url;
  }

  ngOnInit() {
    this.title = 'app-mirval-social-frontend';
    this.identity = this.userService.getIdendity();
    console.log(this.identity);
  }

  // Cada que se produzca algún cambio en el componente este se ejecuta
  ngDoCheck() {
    this.identity = this.userService.getIdendity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this.router.navigate(['/']);
  }
}
