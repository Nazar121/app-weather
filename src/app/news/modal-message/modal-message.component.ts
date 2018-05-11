import { Component, OnInit, ElementRef } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.state';
import { ChangeLan } from '../../redux/lang.action';

// services
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {

   // dictionary data
   lang: string;
   modal: any;

  constructor(
    private langService: LangService,
    private store: Store<AppState>,
    private elRef:ElementRef
  ) { }

  ngOnInit() {

    // listening language
    this.store.select('language').subscribe(res => {
      this.lang = res.lang;
      this.langService.getDictionary(this.lang.toLocaleLowerCase()).subscribe(res => {
        this.modal = res.pages.news.modal;
      });
    });

    this.initializationMessage();
  }

  // initialization
  initializationMessage() {
    const showed = sessionStorage.getItem('modalMessage');
    if ( showed ) {
      
    } else {
      setTimeout(() => {
        this.elRef.nativeElement.querySelector('.myBtn').click();
      }, 5000);
      sessionStorage.setItem('modalMessage', 'true');
    }
  }

}
