import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP_BASE} from '../../config';
import {Common} from '../../utils/common';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  requestURL;

  constructor(
    private http: HttpClient,
    private common: Common
  ) { }


  load(param){
    return this.http.get(this.common.createURL(HTTP_BASE + '/v2/job/slot/snapshot', param)).toPromise();
  }

}
