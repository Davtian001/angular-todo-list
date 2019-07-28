import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FaService } from '../../services/fa.service';
import { MatDialogRef } from '@angular/material';
import { resetPassSucces, resetPassFail } from '../../constatnt/popup-messages.constant' 
 
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss','../dialog-main.scss']
})

export class ResetPassComponent {

  constructor(
    private fa: FaService,
    private dialogRef: MatDialogRef<ResetPassComponent>
  ) {}

  prevent(): false{
    return false
  }
  
  resetPass(){
    this.fa.resetPass(this.email.value).then(_ => {
      this.dialogRef.close({
        to: 'alert',
        alertOptions: {
          message: resetPassSucces(this.email.value),
          after: 'sign-in',
        }
      })
    }).catch(_ => {
      this.dialogRef.close({
        to: 'warning',
        alertOptions: {
          message: resetPassFail(this.email.value),
          after: 'reset-pass',
        }
      })
    })
  }

  email = new FormControl('',[
    Validators.required,Validators.email, 
    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
  ])
  
  getError(){
    return  this.email.hasError('email') ? 'Invalid email' : '';
  }


}