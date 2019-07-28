import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})

export class AdditionalService {
  
  routRedirectUrl: string;

  autoState$ = new BehaviorSubject<User>(null);

  constructor(private firebaseAuth: AngularFireAuth) {

    this.firebaseAuth.authState.subscribe(user => { // not unsubscrib

        user ? this.autoState$.next({ 
          uid: user.uid, 
          displayName: user.displayName, 
          photoUrl: user.providerData[0].photoURL 
        }) : this.autoState$.next(null);
    })
  }


  autoState(): Promise<User | null> {
    return new Promise(resolve => {
      this.firebaseAuth.auth.onAuthStateChanged((user) => {
        user ? resolve({ 
          uid: user.uid, 
          displayName: user.displayName, 
          photoUrl: user.photoURL 
        }) : resolve(null);
      })
    })
  }

}