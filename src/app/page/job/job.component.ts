import { Component, OnInit } from '@angular/core';
import {JobService} from '../../services/channel/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  dataList;
  constructor(
    private jobService: JobService,

  ) { }

  ngOnInit(): void {
    this.loadData();

  }

  loadData(){
    let params = {
      pageSize:10,
      pageNumber: 1
    }
    this.jobService.load(params).then(res => {
      console.log(res);
      this.dataList = res;
    })
  }


}
