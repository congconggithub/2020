import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-job-slot',
  templateUrl: './job-slot.component.html',
  styleUrls: ['./job-slot.component.scss']
})
export class JobSlotComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    echarts.init(document.getElementById('main')).setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: {
        name: 'name',
        type: 'pie',
        data: [
          {name: 'A', value: 1212},
          {name: 'B', value: 2323},
          {name: 'C', value: 1919}
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    });
  }

}
