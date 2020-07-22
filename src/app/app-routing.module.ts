import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './page/home-page/home-page.component';
import {HomePageModule} from './page/home-page/home-page.module';

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent},
  { path: 'home', loadChildren: () => import('./page/home-page/home-page.module').then(m => m.HomePageModule),data:{
      breadcrumb: '首页test'
    } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
