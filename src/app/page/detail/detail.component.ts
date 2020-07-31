import { Component, OnInit ,  ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';

import * as moment from 'moment';
import {HomeService} from '../../services/channel/home.service';
import {DetailService} from '../../services/channel/detail.service';
import { NzIconModule } from 'ng-zorro-antd/icon';


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
  classifyingData = [];
  priorityInput: number;



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
    this.priority = parseInt(this.route.snapshot.queryParams['priority']);
    this.desc = this.route.snapshot.queryParams['desc'];
    this.state = this.route.snapshot.queryParams['state'];
    this.loadCategory();
  }

  loadCategory(){
    this.detailService.loadClassify(this.id).then(res => {
      console.log(res);
      let list: any = []
      res['categories'].forEach(item => {

        let obj: any = {
          id: item.id,
          name: item.name,
          priority: item.priority,
          desc: item.desc,
          state: item.state,
          expand: false,
          children: []
        }
        list.push(obj)
      })
      this.listOfData = this.toTree(list);
    })
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

  save(){
    this.classifying  = this.classifying.replace(/^\s+|\s+$/g,'');
    if ( !this.classifying ) {
      return false;
    }
    console.log(this.classifying , 'this.classifying');
    let param: any = {
      name: this.name,
      id: this.id,
      priority: this.priority,
      categories: [{
        name:this.classifying,
        priority: this.priorityInput
      }]
    }

    this.detailService.saveClassify(param)
      .then((item: any) => {
        console.log(item , 'item');
        this.classifying = ''
      })
  }

  toTree(data) {
    console.log(data , 'data');
    // 删除 所有 data,以防止多次调用
    data.forEach(function (item) {
      delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
      map[item.id] = item;
    });
    var val = [];
    data.forEach(function (item) {
      // 以当前遍历项，的pid,去map对象中找到索引的id
      var parent = map[item.pid];
      // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item);
      }
    });
    console.log(val , 'val');
    return val;
  }

  addTree() {
    this.classifying  = this.classifying.replace(/^\s+|\s+$/g,'');
    if ( !this.classifying ) {
      return false;
    }

    let param: any = {
      name: this.name,
      id: this.id,
      priority: this.priority,
      categories: this.classifying
    }
/*    this.detailService.saveClassify(param)
      .then((item: any) => {
        console.log(item , 'item');
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
      })*/
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

