import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss']
})
export class TopnavbarComponent implements OnInit {

  currentUrl: any = 'DashBoard';

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      )
    .subscribe(event => {
      // 设置面包屑
      let dom = document.getElementsByClassName("ant-breadcrumb-link")
      setTimeout(() => {
        if(dom.length>0)this.currentUrl = dom[dom.length-1]["outerText"]
      }, 0);


    });

  }

}
