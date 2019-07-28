import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Task } from 'src/app/interfaces/task.Interface';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html', 
  styleUrls: ['./single-task.component.scss'],
  outputs: ['editedTask', 'deleteTask', 'toggleTask'],
  inputs: ['taskRow']
})
export class SingleTaskComponent implements OnInit, OnDestroy {
  taskRow: {id: string; task:Task};
  editedTask = new EventEmitter<Task>();
  deleteTask = new EventEmitter();
  toggleTask = new EventEmitter<{id:string, state: boolean}>();
  tickStateTimeout: any;
  isTiemOutedTask: boolean;

  editingFields: {
    editingState: boolean;
    editingName: string;
    editingDescription: string
  };


  /* --Editing Metods-- */
  toggleEditingPanel(){
    this.editingFields.editingState = !this.editingFields.editingState;
  }

  deleteTaskById(){
    this.deleteTask.emit({id: this.taskRow.id, name: this.taskRow.task.name});
  }

  toggleTaskStatus(): void{
    this.taskRow.task.completed = !this.taskRow.task.completed;
    this.toggleTask.emit({id: this.taskRow.id, state: this.taskRow.task.completed});
  }

  confirmEditChanging(){
    const editedTask = {...this.taskRow.task, name: this.editingFields.editingName, description: this.editingFields.editingDescription}
    this.editedTask.emit({...editedTask, id: this.taskRow.id});
    this.editingFields.editingState = !this.editingFields.editingState
  }



  ngOnInit() {
    this.isTiemOutedTask = this.taskRow.task.endTime < new Date().getTime(); // first initialization

    const dateNow = new Date().getTime();

    if((this.taskRow.task.endTime < dateNow) && (!this.taskRow.task.completed)){ // if endTiem < now Date and dont compleated task set timeout compleating
      const tickTime = dateNow - this.taskRow.task.endTime;
v
        this.isTiemOutedTask = true; // subscribe changes
        // this.toggleTaskStatus()
        console.log('end time: -> trggged task')
      }, tickTime);
    }

    this.editingFields = {
      editingState: false,
      editingName: this.taskRow.task.name,
      editingDescription: this.taskRow.task.description,
    };
  }

  ngOnDestroy(){
   clearTimeout(this.tickStateTimeout);
  }
}
