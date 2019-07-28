
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { EMPTY_USER_IMG, defalutTask } from 'src/app/fa-module/constants/defaults';
import { TaskService } from 'src/app/services/task.service';
import { AngularFireDatabase } from '@angular/fire/database';

/* --- Sign-in errors --- */

@Injectable({
  providedIn: 'root'
})

export class FaService {
  currentUserUid: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebase: AngularFireDatabase,
  ) { }

  /* --- Sign In ---- */

  signIn(email: string, password: string, rememberMe: boolean): Promise<string | void> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          if (rememberMe) {
            resolve();
          } else {
            this.firebaseAuth.auth.setPersistence('session').then(_ => resolve());
          }
        }).catch(error => reject(error))
    })
  }


  /* --- Sign Up --- */

  signUp(sugnUpForm): Promise<void> {

    return new Promise(done => { 

      this.firebaseAuth.auth.createUserWithEmailAndPassword(sugnUpForm.email, sugnUpForm.password)

        .then(result => {
          this.firebaseAuth.auth.currentUser.sendEmailVerification();
           
          result.user.updateProfile({
            displayName: sugnUpForm.fullName,
            photoURL: EMPTY_USER_IMG
          });

          ///------default task example--------------
          //-------------------------------------------------------------------
          this.firebase.list(`tasks/${this.firebaseAuth.auth.currentUser.uid}`).push({ // default active task
              task: {
                name: defalutTask.name,
                completed: defalutTask.completed,
                description: defalutTask.description,
                createdAt: new Date().getTime(),
                endTime: 1634391493000,
              }
          });
          this.firebase.list(`tasks/${this.firebaseAuth.auth.currentUser.uid}`).push({ // default time outed task
              task: {
                name: defalutTask.name,
                completed: defalutTask.completed,
                description: defalutTask.description,
                createdAt: 1564081102522,
                endTime: 1564181902522, // time outed
              }
          });
//--------------------------------------------------------------------


          this.signOut();
          done()
        })
    })
  }


  signOut(): Promise<void> {
    return this.firebaseAuth.auth.signOut();
  }

  resetPass(email: string): Promise<void> {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }

  get currentUser(): null | any {
    return this.firebaseAuth.auth.currentUser;
  }

  get authState(): Observable<any> {
    return this.firebaseAuth.authState;
  }



}

