import { Injectable } from '@angular/core';
declare var JSON: any;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(

  ) { }


    setLocalItem(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    }

    getLocalItem(name) {
        const itemString = localStorage.getItem(name);
        if (itemString) {
            return JSON.parse(itemString);
        } else {
            return undefined;
        }
    }
    removeLocalItem(item) {
        localStorage.removeItem(item);
    }

}
