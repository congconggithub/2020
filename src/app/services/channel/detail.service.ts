import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP_BASE} from '../../config';
import {Common} from '../../utils/common';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  requestURL;

  constructor(
    private http: HttpClient,
    private common: Common
  ) { }

  saveClassify(param:any){
    return this.http.post(HTTP_BASE + '/v2/channels/' +param.id +  '/categories',param).toPromise()
  }

  loadClassify(param){
    return this.http.get(this.common.createURL(HTTP_BASE + '/v2/channels/' + param + '/categories', param)).toPromise();
  }

  getConsumer(param){
    return this.http.get(this.common.createURL(HTTP_BASE + '/v2/channels/' + param + '/program', param)).toPromise();
  }

  upload(param:any){
    return this.http.post(HTTP_BASE+'/v2/channels/' + param.id + '/program', param).toPromise()
  }


}
