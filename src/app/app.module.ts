import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';

import {ROUTES} from './app.routes';
import {LocationStrategy, HashLocationStrategy, registerLocaleData} from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import zh from '@angular/common/locales/zh';

import {HomePageModule} from './page/home-page/home-page.module';
import {LayoutModule} from './components/common/layout.module';
import {DetailModule} from './page/detail/detail.module';
import {JobModule} from './page/job/job.module';

registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    RouterModule.forRoot(ROUTES),

    NgZorroAntdModule,
    NzIconModule,
    FormsModule,

    HttpClientModule,

    BrowserAnimationsModule,
    HomePageModule,
    LayoutModule,
    DetailModule,
    JobModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
