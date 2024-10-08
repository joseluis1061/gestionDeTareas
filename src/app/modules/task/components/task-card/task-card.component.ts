import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from 'src/app/core/service/task.service';
import { Router } from '@angular/router';
import { ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() taskListView: ITask[] = [];

  constructor(
    private taskService:TaskService,
    private router: Router
  ){}

  // ngOnChanges(changes: SimpleChanges): void {
  //   throw new Error('Method not implemented.');
  // }

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
