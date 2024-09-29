import { Component, OnInit } from '@angular/core';
import { TaskService } from './core/service/task.service';
import { ITask } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gestionDeTareas';

  constructor(private taskService:TaskService){}

  ngOnInit(): void {

    this.taskService.getTasks().subscribe({
      next: (response: ITask[])=> {
        console.log("Tareas: ", response);
        this.taskService.updateTaskList(response);
      },
      error: (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    }
  )
  }




}
