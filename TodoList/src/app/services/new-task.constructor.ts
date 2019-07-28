import { Task } from '../interfaces/task.Interface';


export function TaskConstructor({ name,description,endTime }: {name: string,description: string,endTime: number}) {
    this.name = name;
    this.description = description;
    this.endTime = endTime
    this.completed = false
}