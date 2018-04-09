import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// components
import { NewsComponent } from './news.component';

const ROUTES: Routes = [
  { path: '', component: NewsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule],
  declarations: [
    NewsComponent
  ]
})
export class NewsModule { }
