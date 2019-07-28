import { Directive, Input, HostListener, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { OpenDialogService } from 'src/app/fa-module/services/open-dialog.service';
import { FaService } from 'src/app/fa-module/services/fa.service';

@Directive({
  selector: '[_persistance]'
})
export class PersistanceDirective {

  @Input('_persistance') callback: Function;

  constructor(
    private fa: FaService,
    private dialog: OpenDialogService,
    private viewRef: ViewContainerRef,
  ){}

  @HostListener('click')onClick(){


    if(this.fa.currentUser){
      const hostComponent = this.viewRef['_view'].component
      this.callback.call(hostComponent,this.fa.currentUser)
    }else{
      this.dialog.openSignIn()
    }

  }
            // [_persistance]="addToBasket" 
}
