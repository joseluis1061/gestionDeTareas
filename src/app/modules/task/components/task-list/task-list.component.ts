import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/service/task.service';
import { ITask } from 'src/app/models/task.model';
import { Router } from '@angular/router';
import { Subscription }from 'rxjs';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{
  taskList: ITask[] = [];
  taskListView: ITask[] = [];
  constructor(
    private taskService: TaskService,
    private router: Router
  ){}
  private subTaskState$!: Subscription;


  ngOnInit(): void {
    this.subTaskState$ = this.taskService.taskListState$.subscribe(
      response => {
        console.log("Behavior Data component ",response)
        this.taskList = response;
        this.taskListView = this.taskList;
      }
    )
  }

  taskReset(){
    this.taskListView = this.taskList;
  }
  taskFilterComplete(){
    this.taskListView = this.taskList.filter(task => {
      return task.complete;
    })
  }

  taskFilterPending(){
    this.taskListView = this.taskList.filter(task => {
      return !task.complete;
    })
  }

  changeTaskCompleteState(task: ITask){
    console.log("Cambiar estado a la tarea: ", task);
    task.complete = !task.complete;
    this.taskService.updateTask(task);
  }

  updateTask(task: ITask){
    console.log("Actualizar: ", task);
    this.router.navigate(['/tasks/new-task'], { state: { task } });
  }

}
