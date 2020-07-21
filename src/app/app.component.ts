import { Component } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PIDP';
  isCollapsed = false;

  constructor(
    private router: Router,
  ){

  }


  openMenu(e){
    this.router.navigateByUrl('/deploy')
  }
}
