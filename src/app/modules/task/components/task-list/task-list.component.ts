import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/service/task.service';
import { ITask } from 'src/app/models/task.model';
import { Subscription }from 'rxjs';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{
  taskList: ITask[] = [];
  constructor(private taskService: TaskService){}
  private subTaskState$!: Subscription;


  ngOnInit(): void {
    // this.taskService.taskList$.subscribe(tasks => {
    //   this.tasks = tasks;
    // });
    this.subTaskState$ = this.taskService.taskListState$.subscribe(
      response => {
        console.log("Behavior Data component ",response)
        this.taskList = response;
      }
    )


  }



}
