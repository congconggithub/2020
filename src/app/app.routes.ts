import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasicLayoutComponent} from './components/common/basicLayout/basicLayout.component';
import {HomePageComponent} from './page/home-page/home-page.component';
// import {ErrorComponent} from './page/error/error.component';


export const ROUTES: Routes = [
    // Main redirect
    {path: '', redirectTo: '/home-page', pathMatch: 'full'},

    {path: 'home-page', loadChildren: () => import('./page/home-page/home-page.module').then(m => m.HomePageModule)},

];
