import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/confirm-message/confirm.component';
import { MatDialogModule, MatButtonModule, MatCheckboxModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPassComponent } from './components/reset-password/reset-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { AuthActionsComponent } from './components/auth-actions/auth-actions.component';
import { RouterModule } from '@angular/router';
import { ForcedFormatDirective } from './directives/forced-format.directive';


@NgModule({
  declarations: [
    ConfirmComponent,
    SignInComponent,
    SignUpComponent,
    ResetPassComponent,
    AlertComponent,
    AuthActionsComponent,
    ForcedFormatDirective,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  
  entryComponents: [
    ConfirmComponent,
    SignInComponent,
    SignUpComponent,
    ResetPassComponent,
    AlertComponent,
  ],

  exports: [
    AuthActionsComponent
  ],

  
})
export class FaModule {}
