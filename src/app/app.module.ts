import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';

import {ROUTES} from './app.routes';
import {LocationStrategy, HashLocationStrategy, registerLocaleData} from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import zh from '@angular/common/locales/zh';

import {HomePageModule} from './page/home-page/home-page.module';
import {LayoutModule} from './components/common/layout.module';


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

    FormsModule,

    HttpClientModule,

    BrowserAnimationsModule,
    HomePageModule,
    LayoutModule

  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
