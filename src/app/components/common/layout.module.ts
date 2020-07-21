import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {BasicLayoutComponent} from './basicLayout/basicLayout.component';
import {FooterComponent} from './footer/footer.component';
import { CommonModule } from '@angular/common';
import {TopnavbarComponent} from './topnavbar/topnavbar.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    BasicLayoutComponent,
    TopnavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzBreadCrumbModule,
  ],
  exports: [BasicLayoutComponent, FooterComponent , TopnavbarComponent]
})

export class LayoutModule {
}
