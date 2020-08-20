import {NgModule} from '@angular/core';
import {BasicLayoutComponent} from '../../components/common/basicLayout/basicLayout.component'
import {RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import { LayoutModule } from '../../components/common/layout.module';
import { CommonModule , DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {JobSlotComponent} from './job-slot.component';
const Router: Routes = [

  {
    path: '', component: JobSlotComponent,
    children: [
      {path: 'jobSlot',
        component: JobSlotComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [ JobSlotComponent],
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
export class JobSlotModule {
}
