import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {en_US, ja_JP, NzI18nService, NzModalService, zh_CN} from 'ng-zorro-antd';



declare var jQuery: any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {
  userList;
  dataList = [];
  codeList = [];
  mapRole  = [];
  rolesList;
  roles ;
  code = {};
  detailItem = {};
  constructor(
      private translateService: TranslateService,
      private modalService: NzModalService,
      private nzI18nService: NzI18nService,

      private router: Router,



  ) {}

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();
    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }

  }

    switchLanguage(lang) {
        this.translateService.use(lang);
        localStorage.setItem('defaultLang', lang);
        let local = ja_JP;
        switch (lang) {
            case 'en': {
                local = en_US;
                break;
            }
            case 'zh': {
                local = zh_CN;
                break;
            }
            case 'ja': {
                local = ja_JP;
                break;
            }
            default:
                local = en_US;
        }
        this.nzI18nService.setLocale(local);
    }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

    toggleNavigation(): void {
        jQuery('body').toggleClass('mini-navbar');
    }

}
