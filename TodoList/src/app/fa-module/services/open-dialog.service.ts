import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { ResetPassComponent } from '../components/reset-password/reset-pass.component';
import { ConfirmComponent } from '../components/confirm-message/confirm.component';
import { ConfirmMessage } from 'src/app/interfaces/confirm-message.interface';
import { AlertMessage } from 'src/app/interfaces/alert-message.interface';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
}) 

export class OpenDialogService {

  constructor(private dialog: MatDialog){}

  redirect(options: {to: string, confirmOptions?: ConfirmMessage, alertOptions?: AlertMessage}){
    if(!options)return;
    switch(options.to){
      case 'sign-in': this.openSignIn(); break;
      case 'sign-up': this.openSignUp(); break;
      case 'reset-pass': this.openResetPass(); break;
      case 'confirm': this.openConfirmMessage(options.confirmOptions); break;
      case 'alert': this.openAlertMessage(options.alertOptions); break;
    }
  }


  openSignUp(): void {

    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '500px',
      autoFocus: true,
      disableClose: true,
      panelClass: 'custom-dialog-class',
    });

    dialogRef.afterClosed().subscribe(to => {
      this.redirect(to)
    })

  }

  openSignIn(): void {

    const dialogRef = this.dialog.open(SignInComponent, {
      width: '400px',
      autoFocus: true,
      disableClose: true,
      panelClass: 'custom-dialog-class',
    });

    dialogRef.afterClosed().subscribe((to) => {
      this.redirect(to)
    });
  }


  openResetPass(): void {
    const dialogRef = this.dialog.open(ResetPassComponent, {
      width: '400px',
      autoFocus: true,
      disableClose: true,
      panelClass: 'custom-dialog-class',
    });

    dialogRef.afterClosed().subscribe(to => {
      this.redirect(to)
    })
  }

  openConfirmMessage(options: ConfirmMessage): void {
    this.dialog.open(ConfirmComponent,{
      data: options,
      disableClose: true,
      panelClass: 'primary-dialog-class',
    })
  }

  

  openAlertMessage(options: AlertMessage): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: options,
      disableClose: false,
      panelClass: 'primary-dialog-class',
      autoFocus: true
    })

    dialogRef.afterClosed().subscribe(to => {
      this.redirect(to)
    })
  }
 
}
