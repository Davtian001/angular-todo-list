import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmMessage } from 'src/app/interfaces/confirm-message.interface';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss', '../confirm-dialog-main.scss']
})

export class ConfirmComponent {

  options: ConfirmMessage

  constructor(@Inject(MAT_DIALOG_DATA) data){
    this.options = data;
  }
  
}
