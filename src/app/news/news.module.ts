import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from '../shared/shared.module';

// services
import { NewsService } from '../services/news.service';

// components
import { NewsComponent } from './news.component';
import { NewComponent } from './new/new.component';

const ROUTES: Routes = [
  { path: '', component: NewsComponent },
  { path: 'new/:new', component: NewComponent },
  { path: '**', redirectTo: 'news' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
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
