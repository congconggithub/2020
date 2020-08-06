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
import * as _ from 'lodash';

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
  treeList : any = [];
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
      let re = [res]
      console.log(re);
      console.log(res , 'res');
      this.listOfData = re;
      this.treeList = _.cloneDeep(this.listOfData);

      this.treeList.forEach(l => {
        l['title'] = l['name'] + '（权重：' + l['priority'] + '）';
        l['key'] = l['id'];
        l['children'] = l['categories']
        this.changeProp(l);
      })
    })
  }
  changeProp(data){
    if(data['categories']){
      data.categories.forEach( d => {
        d['title'] = d['name'] + '（权重：' + d['priority'] + '）';
        d['key'] = d['id'];
        d['children'] = d['categories']
        if(d['categories']){
          this.changeProp(d)
        }
      })
    }

  }


  changeData(){
    this.created = moment().format('x');
    let params = {
      name: this.name,
      id: this.id,
      priority: this.priority,
      desc: this.desc,
      state: false,
      // created:this.created
    }
    this.homeService.saveData(params)
      .then( res => {
        this.notification.create('success', '修改成功', '');
      })
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
    console.log(item , 'item');
    let param = {
      name: item['classifying'],
      priority: item['priorityInput'],
      pid: item['pid']
    }
    this.findParent(this.listOfData , param);
    console.log(this.listOfData , 'this.listOfData');
    let paramData = this.listOfData[0];
    this.detailService.saveClassify(paramData)
      .then((item: any) => {
        this.classifying = '';
        this.loadCategory();
        this.close();
      })
  }

  findParent(list , data ){
    list.forEach(e => {
      delete e.selected;
      delete e.key;
      delete e.title;
      if( e.id === data.pid){
        if( e['categories']){
          console.log(e , 111);
          e['categories'].push(data);
        }else {
          e['categories'] = [data];
        }
        delete data.pid;
        return;
      }else if(e['categories'] && e['categories'].length > 0){
        console.log(e , 2);
        this.findParent(e['categories'] , data);
        if(data.pid) delete data.pid;
        e['categories'].push(data);
        return ;
      }else {
        console.log(3);
        if(data.pid) {delete data.pid};
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

