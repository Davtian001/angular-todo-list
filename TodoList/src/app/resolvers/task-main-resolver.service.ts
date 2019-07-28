import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, switchMap, map } from 'rxjs/operators';
import { Task } from 'src/app/interfaces/task.Interface';
import { TaskService } from 'src/app/services/task.service';

const defaults: any = [ { "id": "-LkimmUnjTXyPDELKSHf", "task": { "compleated": false, "createdAt": 1564153158963, "description": "Learn leic gedhye wtddw yrj louhrmf", "endTime": 1564153168962, "name": "Work home Angular" } }, { "id": "-LkimpaChONoKsvee8qF", "task": { "compleated": false, "createdAt": 1564153171661, "description": "Learn leic gedrn leic gedrn leic gedhye wtddw yrj louhrmf", "endTime": 1564153181661, "name": "Buy Products" } }, { "id": "-Lkimpq9qlUBFEZ_9nI8", "task": { "compleated": false, "createdAt": 1564153172683, "description": "Learn leic gedhye wtddw yrj louhrmf", "endTime": 1564153182683, "name": "Learn Angular" } }, { "id": "-Lkimq7q48TcMQYK7A8A", "task": { "compleated": false, "createdAt": 1564153173879, "description": "Learn leic gedhye wtdleic gedhye wtddw yleic gedhye wtddw ydw yrj louhrmf", "endTime": 1564153183878, "name": "Wash Car" } } ]

@Injectable({
  providedIn: 'root'
})
export class TaskMainResolverService implements Resolve<Task[]> {

  constructor(private taskService: TaskService, private route: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Task[]> | Observable<never> {
      // return of(defaults)
      return this.taskService.getTasksWithIds().pipe(
        take(1), // compleate -> router data
        switchMap(tasks => {
          if(tasks) return of(tasks);
           
          else {
            this.route.navigate(['/tasks']);
            return EMPTY;
          }
        })
        )
    } 
}
