import { MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatProgressBarModule, MatTooltipModule, MatMenuModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FaModule } from './fa-module/fa.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment.prod';


export const ProjectMainModules = [
    FaModule,
  ];


export const FireBaseModules = [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
];

export const MaterialDesignModules = [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule
];


