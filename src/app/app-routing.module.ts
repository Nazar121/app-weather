import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// components


const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule'},
  { path: 'news', loadChildren: 'app/news/news.module#NewsModule' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
