import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AdditionalService } from 'src/app/fa-module/services/additional.service';
import { OpenDialogService } from 'src/app/fa-module/services/open-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class FaGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AdditionalService,
    private router: Router,
  ) { }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;
    return this.navigateToTasks(url) as Promise<boolean>;
  }


  canActivateChild(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(route, state)
  }

   

  navigateToTasks(url: string): Promise<boolean> {
    return new Promise(resolve => {
      this.auth.autoState$.subscribe(udata => {

        if (udata) { 
          resolve(true);
        }
        else {
          resolve(false);
          // console.log('blocked');
          this.router.navigate(['/'])
          this.auth.routRedirectUrl = url;
        }
      })
    })
  }
}
