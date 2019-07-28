import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task.Interface';
import { TaskService } from 'src/app/services/task.service';
import { TaskConstructor } from 'src/app/services/new-task.constructor';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-task-panel',
  templateUrl: './add-task-panel.component.html',
  styleUrls: ['./add-task-panel.component.scss'],
  inputs: ['tasksRow:tasks']
})
export class AddTaskPanelComponent implements OnInit {

  tasksRow: { task: Task, id: string }[];
  selectedTaskEndTimesDates: number[];
  taskForm: AbstractControl;
  hidTaskForm: boolean = false;
  minDate = new Date();
  maxDate = new Date(2020, 0, 1);

  constructor(private taskService: TaskService,) { }

// Getters
  get name(){ return this.taskForm.get('name');}
  get description(){ return this.taskForm.get('description');}
  get endTime(){ return this.taskForm.get('endTime');}


// Get Form Errors
  getErrorMessageName() {
    return this.name.hasError('required') ? 'Required field' :
           this.name.hasError('minlength') ? 
           `requiredLength ${this.name.errors.minlength.requiredLength}` :
            '';
  }

  getErrorMessageDescription() {
    return this.description.hasError('required') ? 'Required field' :
           this.description.hasError('minlength') ? 
           `requiredLength ${this.description.errors.minlength.requiredLength}` :
            '';
  }

  
// Create Task 
  createTask(): void {
    const newTask: Task = { ...new TaskConstructor(this.taskForm.value) }
    newTask.endTime = new Date(newTask.endTime).getTime();
    
    this.taskService.addTask(newTask);
    this.hidTaskForm = false;
    this.taskForm.reset()
  }


  ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(700)]),
      endTime: new FormControl('', Validators.required)
    })
  }

}
