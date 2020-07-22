import {NgModule} from '@angular/core';
import {BasicLayoutComponent} from '../../components/common/basicLayout/basicLayout.component'
// import {SharedModule} from '../../shared.module';
import {RouterModule, Routes} from '@angular/router';
// import {NzToolTipModule} from 'ng-zorro-antd';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import { HomePageComponent } from './home-page.component';
import { LayoutModule } from '../../components/common/layout.module';
import { CommonModule , DatePipe} from '@angular/common';

const Router: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {
    path: '', component: HomePageComponent,
    children: [
      {path: 'home-page',
        component: HomePageComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [ HomePageComponent],
  imports: [
    // SharedModule,
    // QuillModule,
    // NzToolTipModule,
    // ImageCropperModule,
    NgZorroAntdModule,
    CommonModule,
    LayoutModule,
    RouterModule.forChild(Router)
  ],
  providers:[DatePipe],
  exports: [
  ]
})
export class HomePageModule {
}
