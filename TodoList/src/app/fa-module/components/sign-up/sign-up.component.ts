import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, of, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FaService } from '../../services/fa.service';
import { switchMap, map, tap, delay } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';
import { AdditionalService } from '../../services/additional.service';
import { _passConfirm } from '../../validators/confirm-pass';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../dialog-main.scss']
})


export class SignUpComponent implements OnInit {

  /* --- Variables --- */
  hidePassword: boolean = true;
  destroyStream = new Subject<void>();
  registerForm: FormGroup;
  busyEmailError: boolean;
  submitted:boolean;

  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>,
    public formBuilder: FormBuilder,
    public router: Router,
    private fa: FaService,
    private fireAuth: AngularFireAuth,
  ) { }



  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      fullName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
  
      email: ['', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      ], this.isBusyEmail.bind(this)],
  
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        // _password
      ]],
      passwordConfirm: [''],
    })


    this.passConfirm.setValidators([ _passConfirm(this.pass), Validators.required]) // error inicializ....
  }


  /* --- Getters --- */

  get fullName(): AbstractControl {return this.registerForm.get('fullName');}
  get email(): AbstractControl {return this.registerForm.get("email")}
  get pass(): AbstractControl {return this.registerForm.get("password")}
  get passConfirm(): AbstractControl {return this.registerForm.get("passwordConfirm")}


  // Get Errors Hanhling
  getErrorsFullName(){
    return this.fullName.hasError('required') ? 'Required field' :
           this.fullName.hasError('minlength') ?  
           `requiredLength ${this.fullName.errors.minlength.requiredLength}` : '';
  }

  getErrorsEmail(){
    return this.email.hasError('email') ? 'Invalid email' :
           this.email.hasError('required') ? 'Required field' : 
           this.email.hasError('_async') ? 'Email is Busy' :'';
  }
  getErrorsPass(){
    return this.pass.hasError('required') ?  'Required field' :
           this.pass.hasError('minlength') ?
           `requiredLength ${this.pass.errors.minlength.requiredLength}` : '';
  }

  passConfirmError(){
    return this.pass.hasError('required') ?  'Confirem Password' :
           this.pass.hasError('_passConfirm') ? this.pass.errors._passConfirm.message : '';
  }


  /* --- Methods --- */

  prevent(): false {
    return false;
  }

  toSignIn() {
    this.dialogRef.close({ to: 'sign-in' })
  }


  isBusyEmail(control: AbstractControl): Observable<ValidationErrors > {

    return of(control.value).pipe(

      delay(500),
      switchMap(email => this.fireAuth.auth.fetchSignInMethodsForEmail(email)),
      map(isBusy => isBusy.length ? { _async: { message: 'This email was already registered' } } : null),
      tap(isBusy => this.busyEmailError = !!isBusy)
    )

  }

  onSubmit() {
    // if (this.registerForm.invalid) {
    //   for (let control in this.registerForm.controls) {
    //     this.registerForm.controls[control].markAsTouched();
    //   }
    //   return
    // }
    this.register();
  }


  register() {
      this.fa.signUp(this.registerForm.value).then(_ => {
        this.submitted = false;
          this.toSignIn();
        })
  }


  ngOnDestroy() {
    this.destroyStream.next()
  }

}

