import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Common {

    /**
     * 传入file 返回base64编码
     * @param file File类型
     * @param callback
     */
    public file2Base64(file: any, callback: (img: string) => void): void {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result!.toString()));
        reader.readAsDataURL(file);
    }

    public createURL(url, param: any /*链接和参数*/) {
        let newlink = '';
        let lastParam = '';
        if (url.split('?').length > 1) {

            lastParam = url.split('?')[1] + '&';
            url = url.split('?')[0];
        }
        for (let key in param) {
            let item = param[key];
            let link = '&' + key + '=' + item;
            newlink += link;
        }
        newlink = url + '?' + lastParam + newlink.substr(1);
        return newlink;
    }

    public createGetUrl(url, param) {
        for (let key in param) {
            url = url.replace(`{${key}}`, param[key])
        }
        return url
    }

}
