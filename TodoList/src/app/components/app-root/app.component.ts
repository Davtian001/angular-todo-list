import { Component, OnInit } from '@angular/core';
import { AdditionalService } from 'src/app/fa-module/services/additional.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

  currentUser$: Observable<any>;

  constructor(private faAdditional: AdditionalService,) { }

  ngOnInit() {
    this.currentUser$ = this.faAdditional.autoState$
  }


}