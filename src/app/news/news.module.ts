import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// services
import { NewsService } from '../_services/news.service';

// components
import { NewsComponent } from './news.component';
import { NewComponent } from './new/new.component';

const ROUTES: Routes = [
  { path: '', component: NewsComponent },
  { path: 'new/:idNew', component: NewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule],
  declarations: [
    NewsComponent,
    NewComponent
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule { }
