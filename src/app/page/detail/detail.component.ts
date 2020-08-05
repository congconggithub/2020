import { Component, OnInit ,  ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';

import * as moment from 'moment';
import {HomeService} from '../../services/channel/home.service';
import {DetailService} from '../../services/channel/detail.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd/upload';
import {HTTP_BASE} from '../../config';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @ViewChild('modifyDetail', {static: false}) modifyDetail;
  @ViewChild('modalFooter', {static: false}) modalFooter;

  validateForm: FormGroup;
  detailDateForm: FormGroup;
  detailItem: any = {};
  modifyModal: NzModalRef;

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

  fileItem: any = {};
  fileList: any = [];
  uploadDesc = '' ; // 上传描述
  uploading = false ; // 上传loading状态
  uploadPath = '';
  configuration= [];   // 配置
  i = 0;
  editId: string | null = null;
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

    }),
      this.detailDateForm = this.fb.group({
        classifying:[null,[Validators.required]],
        priorityInput:[null,[Validators.required]],
      })
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.queryParams['name'];
    this.id = this.route.snapshot.queryParams['id'];
    this.priority = parseInt(this.route.snapshot.queryParams['priority']);
    this.desc = this.route.snapshot.queryParams['desc'];
    this.state = this.route.snapshot.queryParams['state'];
    this.uploadPath =  HTTP_BASE + '/v2/channels/'+ this.id +'/program';

    this.loadCategory();
  }

  loadCategory(){
    this.detailService.loadClassify(this.id).then(res => {
      this.listOfData = res['categories'];
      this.listOfData.forEach(l => {
        l['title'] = l['name'] + '（权重：' + l['priority'] + '）';
        l['key'] = l['id']
      })
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

/*  save(){
    this.classifying  = this.classifying.replace(/^\s+|\s+$/g,'');
    if ( !this.classifying ) {
      return false;
    }
    console.log(this.classifying , 'this.classifying');
    let data = [{
      name:this.classifying,
      priority: this.priorityInput,
      expand: false,
    }]
    console.log(data , 'data111');
    this.toTree(data);
    let param: any = {
      name: this.name,
      id: this.id,
      priority: this.priority,
      categories: [
        // {name:this.classifying, priority: this.priorityInput}
      ]
    }

  }*/

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
    console.log(map , 'map');
    var val = [];
    data.forEach(function (item) {
      // 以当前遍历项，的pid,去map对象中找到索引的id
      var parent = map[item.pid];
      // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        // (parent.children || (parent.children = [])).push(item);
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item);
      }
    });
    console.log(val , 'val');
    return val;
  }

  nzEvent(event: NzFormatEmitEvent): void {
    this.detailItem = {pid : event.node.origin.id};
    this.modifyModal = this.modalService.create({
      nzTitle: '新增分类',
      nzContent: this.modifyDetail,
      nzWidth: 800,
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: this.modalFooter
    })
  }

  close(){
    this.modifyModal.destroy()
  }

  saveData(item){
    this.findParent(this.listOfData , item);
    this.detailService.saveClassify(this.listOfData)
      .then((item: any) => {
        console.log(item , 'item');
        this.classifying = '';
        this.loadCategory();
        this.close();
      })
  }

  findParent(list , data ){
    list.forEach(e => {
      if( e.id === data.pid){
        if( e['categories']){
          e['categories'].push(data);
        }else {
          e['categories'] = [data]
        }
        return;
      }else if(e['categories'] && e['categories'].length > 0){
        this.findParent(e['categories'] , data);
        e['categories'].push(data);
        return ;
      }else {
        this.listOfData.push(data);
        return;
      }
    })
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  addRow(): void {
    this.configuration = [
      ...this.configuration,
      {
        key: `${this.i}`,
        value: `Edward King ${this.i}`,
      }
    ];
    this.i++;
  }



}

