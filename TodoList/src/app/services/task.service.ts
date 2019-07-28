import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.Interface';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { takeUntil, map } from 'rxjs/operators';
import { AdditionalService } from '../fa-module/services/additional.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasksDestroyStream$ = new Subject<void>();
  destroyStream$ = new Subject<void>();
  currentUserUid: string;

  constructor(
    private firebase: AngularFireDatabase,
    private fb: AngularFirestore,
    private faAdditional: AdditionalService,

  ) {
    this.faAdditional.autoState$.pipe(takeUntil(this.destroyStream$))
      .subscribe(uData => this.currentUserUid = uData ? uData.uid: null);
      // this.fb.firestore.disableNetwork()
  }


  /* ------ Methods ------ */

  public getTaskById<T>(id: string): Observable<T> {
    if(!this.currentUserUid) return; // security  optional
    return this.firebase.object<T>(`tasks/${this.currentUserUid}/${id}`).valueChanges();
  }



  public getTasksWithIds(): Observable<Task[]> {
    if(!this.currentUserUid) return; //security optional...  
    return new Observable(observer => {
      this.firebase.list(`tasks/${this.currentUserUid}`).snapshotChanges().pipe(
        takeUntil(this.getTasksDestroyStream$),
        map(tasksData => tasksData.map(task => Object.assign({}, { id: task.key }, task.payload.val()))),
        map(tasksDataWithIds => observer.next(tasksDataWithIds as Task[]))
      ).subscribe();
    })
  }



  public addTask(payload: Task): Promise<any> {
    if(!this.currentUserUid) return; //security optional...  
    payload = { ...payload };// make valid obj for post (type new TaskConstructor is invaiid) 

    return this.firebase.list(`tasks/${this.currentUserUid}`).push({
      task: {
        name: payload.name,
        completed: payload.completed,
        description: payload.description,
        createdAt: new Date().getTime(),
        endTime: payload.endTime,
      }
    }).catch();
  }

  /**
   * 
   * @param taskId 
   * @param payload type -> Task
   */
  public updateTask(taskId: string, payload: Task): Promise<void> {
    if(!this.currentUserUid) return; //security optional...  
    return this.firebase.object(`tasks/${this.currentUserUid}/${taskId}/task`).update(payload).catch();
  }


/**
 * @param taskId
 * @param state: boolean
 */
  public toggleTask(taskId: string, state: boolean = true): Promise<void> {
    if(!this.currentUserUid) return; //security optional...  
    return this.firebase.object(`tasks/${this.currentUserUid}/${taskId}/task`).update({ completed: state }).catch();
  }

/**
 * 
 * @param taskId 
 */
  public deleteTaskById(taskId: string): Promise<void> {
    if(!this.currentUserUid) return; //security optional...  
    return this.firebase.object(`tasks/${this.currentUserUid}/${taskId}`).remove().catch();
  }



}
