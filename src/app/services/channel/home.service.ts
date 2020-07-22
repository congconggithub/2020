import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP_BASE} from '../../config';
import {Common} from '../../utils/common';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  requestURL;
  constructor(
    private http: HttpClient,
    private common: Common
  ) { }


  // 首页table里的数据
  getData(param){
    this.requestURL = HTTP_BASE + '/v2/channels';
    return this.http.post(this.requestURL , param);
  }


}
