import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// redux
import { StoreModule } from '@ngrx/store';
import { langReducer } from './redux/lang.reducer';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// routing
import { AppRoutingModule } from './app-routing.module';

// services
import { LangService } from './services/lang.service';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({language: langReducer})
  ],
  providers: [LangService],
  bootstrap: [AppComponent]
})
export class AppModule { }
