import {NgModule} from '@angular/core';
import {BasicLayoutComponent} from '../../components/common/basicLayout/basicLayout.component'
// import {SharedModule} from '../../shared.module';
import {RouterModule, Routes} from '@angular/router';
// import {NzToolTipModule} from 'ng-zorro-antd';
import { HomePageComponent } from './home-page.component';
// import { ImageCropperModule } from 'ngx-image-cropper';

const Router: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {
    path: '', component: BasicLayoutComponent,
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
    RouterModule.forChild(Router)
  ],
  exports: [
  ]
})
export class HomePageModule {
}
