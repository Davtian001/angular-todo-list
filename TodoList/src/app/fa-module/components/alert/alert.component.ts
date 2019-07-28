import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmMessage } from 'src/app/interfaces/confirm-message.interface';
import { AlertMessage } from 'src/app/interfaces/alert-message.interface';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss', '../confirm-dialog-main.scss']
})

export class AlertComponent {

  options: AlertMessage

  constructor(@Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<AlertComponent>){
    this.options = data;
  }

  close(){
    this.dialogRef.close({to: this.options.after})
  }
  
}