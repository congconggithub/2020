import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../services/channel/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  dataList = [];
  constructor(
    private homeService: HomeService,

  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    const params = {
      id: '199e725b3605e17a1da75663113ffaea',
      name: 'fare',
      desc: 'fare channel',
      priority: 2,
      state: true,
  }
    this.homeService.getData(params).subscribe(re => {
      if (re['code'] === 0) {
        console.log(re , 'res');
        this.dataList = re['data'];
      }
    });
  }

}
