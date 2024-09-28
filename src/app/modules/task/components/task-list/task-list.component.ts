import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/service/task.service';
import { ITask } from 'src/app/models/task.model';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{
  taskList: ITask[] = [];
  constructor(private taskService: TaskService){}



  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (response: ITask[])=> {
        console.log("Tareas: ", response);
        this.taskList = response;
      }
    )
  }



}
