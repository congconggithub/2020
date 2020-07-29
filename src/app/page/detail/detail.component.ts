import { Component, OnInit ,  ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';

import * as moment from 'moment';
import {HomeService} from '../../services/channel/home.service';
import {DetailService} from '../../services/channel/detail.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  validateForm: FormGroup;

  name ;
  id;
  priority: number;
  desc;
  state: boolean;
  created;
  listOfData: any = [];

  classifying = '';




  constructor(
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private notification:NzNotificationService,
    private homeService: HomeService,
    private detailService: DetailService,

  ) {
    this.validateForm = this.fb.group({
      name:[null,[Validators.required]],
      priority:[null,[Validators.required]],
      desc:[null,[Validators.required]],
      state:[null,[Validators.required]],

    })
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.queryParams['name'];
    this.id = this.route.snapshot.queryParams['id'];
    this.priority = this.route.snapshot.queryParams['priority'];
    this.desc = this.route.snapshot.queryParams['desc'];
    this.state = this.route.snapshot.queryParams['state'];

  }


  changeData(){
    this.created = moment().format('x');
    let params = {
      name: this.name,
      id: this.id,
      priority: this.priority,
      desc: this.desc,
      state: this.state,
      created:this.created
    }
    this.homeService.saveData(params)
      .then( res => {
        this.notification.create('success', '修改成功', '');
      })
  }

  addTree() {
    this.classifying  = this.classifying.replace(/^\s+|\s+$/g,'');
    if ( !this.classifying ) {
      return false;
    }

    let param: any = {
      labelName: this.classifying
    }
    this.detailService.saveClassify(param)
      .then((item: any) => {
        if (!this.listOfData) this.listOfData = []
        if (item.data && item.data.labelId) {
          let list = [...this.listOfData];
          this.listOfData = []
          list.push({
            id: item.data.labelId,
            name: item.data.labelName,
            pid: item.data.parentId,
            level: item.data.labelLevel,
            expand: false,
            children: []
          })
          this.listOfData = list;
        }

        this.classifying = ''
      })
  }


  deleteLabel(id, index) {
/*    this.detailService.deleteLabel({ id: id })
      .then(res => {
        let list = [...this.listOfData]
        this.listOfData = []
        list.splice(index, 1)
        this.listOfData = list
      })*/
  }


}

