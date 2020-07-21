import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './page/home-page/home-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
