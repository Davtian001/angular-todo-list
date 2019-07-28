import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ProjectMainModules, FireBaseModules, MaterialDesignModules } from './useds-modules';
import { TasksMainComponent } from './components/tasks-main/tasks-main.component';
import { SingleTaskComponent } from './components/single-task/single-task.component';

import { AddTaskPanelComponent } from './components/add-task-panel/add-task-panel.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './components/app-root/app.component';
import { HeaderComponent } from './components/header/header.component';

// import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
 

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    TasksMainComponent,
    SingleTaskComponent,
    AddTaskPanelComponent,
    HeaderComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
    ...ProjectMainModules,
    ...FireBaseModules,
    ...MaterialDesignModules,

    AppRoutingModule,
    
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
