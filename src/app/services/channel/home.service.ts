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
    return this.http.get(this.common.createURL(HTTP_BASE + '/v2/channels', param)).toPromise();
  }

  saveData(param){
/*    if(param.id){
      return this.http.put(HTTP_BASE+'/v2/channels' , param).toPromise();
    }else{
      return this.http.post(HTTP_BASE+'/v2/channels' , param).toPromise();
    }*/
    return this.http.post(HTTP_BASE+'/v2/channels' , param).toPromise();
  }
  remove(param){
    console.log(param , 'param');
    return this.http.delete(HTTP_BASE + '/v2/channels/' + param.id);
  }

}
