import {NgModule} from '@angular/core';
import {BasicLayoutComponent} from '../../components/common/basicLayout/basicLayout.component'
import {RouterModule, Routes} from '@angular/router';

import {NgZorroAntdModule} from 'ng-zorro-antd';
import {DetailComponent} from './detail.component';

import { LayoutModule } from '../../components/common/layout.module';
import { CommonModule , DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
const Router: Routes = [
  {path: '', redirectTo: '/detail', pathMatch: 'full'},
  {
    path: '', component: DetailComponent,
    children: [
      {path: 'detail',
        component: DetailComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [ DetailComponent],
  imports: [
    NgZorroAntdModule,
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    RouterModule.forChild(Router)
  ],
  providers:[DatePipe],
  exports: [
  ]
})
export class DetailModule {
}
