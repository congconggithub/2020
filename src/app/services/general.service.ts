import {Injectable} from '@angular/core';
import {StorageService} from './common/storage.service';
import {HTTP_BASE} from '../config';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    public _httpBase;

    constructor() {
        this.buildParameters();
    }

    buildParameters() {
        this._httpBase = HTTP_BASE;
    }

    get httpBase() {
        this._httpBase = HTTP_BASE;
        return this._httpBase;
    }

    set httpBase(value) {
        this._httpBase = value;
    }


}
