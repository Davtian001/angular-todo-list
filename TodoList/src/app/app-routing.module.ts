import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksMainComponent } from './components/tasks-main/tasks-main.component';

import { FaGuard } from './fa-module/guards/activate.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'fifth', pathMatch: 'full' },

  { path: 'fifth', canActivateChild: [FaGuard], children: [{
    path: 'tasks',  canActivate: [FaGuard], component: TasksMainComponent }
    ]},

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
// resolve: [TaskMainResolverService],
// canActivateChild:[FaGuard], 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

