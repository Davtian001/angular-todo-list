import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  inputs: ['currentUser']
})
export class HeaderComponent implements OnInit {
  currentUser: Observable<any>;


  constructor() { }

  ngOnInit() {}

}

