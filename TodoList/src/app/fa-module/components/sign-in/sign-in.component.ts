import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { FaService } from '../../services/fa.service'
import { MatDialogRef } from '@angular/material';


const REQUIRED: string = 'Both email and password are required';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss','../dialog-main.scss'],
})

export class SignInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private fa: FaService,
    private dialogRef: MatDialogRef<SignInComponent>,
  ){}

  /* --- Variables --- */

  isShownError: boolean;
  hidePassword: boolean = true;
  loggingIn: boolean = false;
  rememberMe: FormControl = new FormControl(false)
  signInForm: FormGroup
  


  /* --- Getters --- */

  get email(): AbstractControl {
    return this.signInForm.get('email');
  }
  get password(): AbstractControl {
    return this.signInForm.get('password');
  }



  /* --- Methods --- */

  // Get Errors
  getErrorsEmail(){
    return this.email.hasError('email') ? 'Invalid email' :
           this.email.hasError('required') ? 'Required field' : 
           '';
  }
  getErrorsPass(){
    return this.password.hasError('required') ?  'Required field' :
           this.password.hasError('minlength') ?
           `requiredLength ${this.password.errors.minlength.requiredLength}` : 
           '';
  }


  handleSignIn(){

    this.loggingIn = true;
      this.fa.signIn(this.email.value, this.password.value, this.rememberMe.value)
      .then(_ => {
        this.loggingIn = false;
        this.dialogRef.close();

      }).catch(message => this.loggingIn = false)
    }

  toSignUp(){
    this.dialogRef.close({to: 'sign-up'});
  }

  toResetPassword(){
    this.dialogRef.close({to: 'reset-pass'})
  }

  ngOnInit(){
    this.signInForm = this.fb.group({
      email: ['',[Validators.email, Validators.required]],
      password: ['',[ Validators.required, Validators.minLength(8)]],
    })
  }

}