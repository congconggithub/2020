import { Component, OnInit , ViewChild} from '@angular/core';
import {HomeService} from '../../services/channel/home.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  modifyModal: NzModalRef;
  @ViewChild('modifyDetail', {static: false}) modifyDetail;
  @ViewChild('modalFooter', {static: false}) modalFooter;

  detailItem: any = {};

  dataList = [];
  pageSize = 10;
  pageNo = 1;
  totalNum;
  validateForm: FormGroup;

  constructor(
    private router:Router,
    private homeService: HomeService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private notification:NzNotificationService,


  ) {
    this.validateForm = this.fb.group({
      name:[null,[Validators.required]],
      priority:[null,[Validators.required]],
      desc:[null,[Validators.required]],
      state:[null,[Validators.required]],
    })
  }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    const params = {pageNumber: 1, pageSize: 99999}
    this.homeService.getData(params).then(res => {
      console.log(res , 'res');
      this.dataList = res['channels'];
    })
  }

  pageChange(e ){
    console.log(e);
  }

  add(){
    console.log(1);
    this.modifyModal = this.modalService.create({
      nzTitle: '新增项目',
      nzContent: this.modifyDetail,
      nzWidth: 800,
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: this.modalFooter
    })
  }

  saveData(item){
    item['created'] = moment().format('x');
    console.log(item , 'item');
    this.homeService.saveData(item)
      .then( res => {
        this.notification.create('success', '新增成功', '');
        this.loadData();
        this.close();
      })
  }

  close(){
    this.modifyModal.destroy()
  }
  returnTo(key){
    let params = {
      id:key.id ,
      name:key.name,
      priority: key.priority,
      desc: key.desc,
      state: key.state
    }
    this.router.navigate(['/detail/'],{queryParams: params})
  }

  delete(model) {
    this.homeService.remove(model).subscribe(result => {
      if (result['code'] === 0) {
        this.loadData();
        this.notification.create('success', '删除成功', '');
      } else {
        this.notification.create('error', '删除出错', result['message']);
      }
    })
  }

}
