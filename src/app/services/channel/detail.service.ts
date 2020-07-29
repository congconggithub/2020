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
    return this.http.post(HTTP_BASE+ param.id +  '/categories',param).toPromise()
  }

}
