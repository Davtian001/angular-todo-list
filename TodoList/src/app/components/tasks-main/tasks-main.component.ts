import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task.Interface';
import { Observable, Subject } from 'rxjs';
import { OpenDialogService } from 'src/app/fa-module/services/open-dialog.service';
import { deleteTask, editTask } from 'src/app/fa-module/constatnt/popup-messages.constant';
// import { TaskConstructor } from 'src/app/services/new-task.constructor';

@Component({
  selector: 'app-tasks-main',
  templateUrl: './tasks-main.component.html',
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent implements OnInit, OnDestroy {

  destroyStream$ = new Subject<void>();
  tasks$: Observable<Task[]>;
  dinamicSelecteEditableTask: Task;

  constructor(
    private taskService: TaskService,
    private dialog: OpenDialogService,
  ) { }

  // Metods
  deleteTask({ id, name }): void {

    this.dialog.openConfirmMessage({
      message: deleteTask(name),
      accept: () => this.taskService.deleteTaskById(id)
    });
  }

  toggleTask({id, state}): void {
    this.taskService.toggleTask(id, state);
  }

  editedTask({ name, description, completed, createdAt, endTime, id }: Task): void {
    const callback = () => this.taskService.updateTask(id, {
      name,
      description,
      completed,
      createdAt,
      endTime
    });

    this.dialog.openConfirmMessage({
      message: editTask(name),
      accept: callback,
    })
  }

  // Testing autocompleate
  // f() { /// from test autocolplate task
  //   this.taskService.addTask(new TaskConstructor({
  //     name: 'test Angular',
  //     description: 'Learn leic gedhye  wtddw yrj louhrmf',
  //     endTime: new Date().getTime() + 50
  //   }))
  // }
  
  // lC Hooks
  ngOnInit() {
    // this.tasks$ = this.acRoute.data as Observable<Task[]>; // first init component;
    this.tasks$ = this.taskService.getTasksWithIds()
  }

  ngOnDestroy() {
    this.destroyStream$.next(); // unsubscribe valueChanges
    // this.taskService.destroyStream$.next(); // unsubscribe valueChanges
  }
}
