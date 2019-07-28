import { Component, OnInit } from '@angular/core';
import { OpenDialogService } from 'src/app/fa-module/services/open-dialog.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FaService } from 'src/app/fa-module/services/fa.service';
import { logOut } from '../../constatnt/popup-messages.constant'
import { AdditionalService } from '../../services/additional.service';

@Component({
  selector: 'app-auth-actions',
  templateUrl: './auth-actions.component.html',
  styleUrls: ['./auth-actions.component.scss']
})
export class AuthActionsComponent implements OnInit {

  currentUser: any;

  constructor(
    private dialog: OpenDialogService,
    private fa: FaService,
    private faAdditional: AdditionalService,
    private firebaseAuth: AngularFireAuth,
  ) { }

  get hasCurrentUser(){
    return this.firebaseAuth.auth.currentUser;
  }

  public signIn(){
    this.dialog.openSignIn();
  }

  public signUp(){
    this.dialog.openSignUp();
  }

  public logout() {
    this.dialog.openConfirmMessage({
      message: logOut(),
      accept: () => this.signOut(),
    })
  }


  private signOut(){
    this.fa.signOut().then();
  }

  ngOnInit() {
    this.faAdditional.autoState$.subscribe(uData => {

        if(uData){
          uData.displayName;
          this.currentUser = uData;
          
        }else{
          this.currentUser = null;
        }      
    })

  }

}
