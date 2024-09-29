import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import { ITask } from 'src/app/models/task.model';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl: string = "https://jsonplaceholder.typicode.com";

  private taskList: ITask[] = [];
  private taskListState = new BehaviorSubject<ITask[]>([]);
  public taskListState$ =this.taskListState.asObservable();


  constructor(
    private http: HttpClient
  ) { }


  getTasks(): Observable<ITask[]> {
    const data =       [
      {
        id: 1,
        taskName: "Tarea 1",
        complete: false,
        taskDate: "2024-09-27",
        persons: [
          {
            id: 1,
            personName: "Juan Pérez",
            age: 30,
            personSkills: ["Angular", "TypeScript", "CSS"]
          },
          {
            id: 2,
            personName: "María Gómez",
            age: 25,
            personSkills: ["Java", "Spring Boot", "Hibernate"]
          }
        ]
      },
      {
        id: 2,
        taskName: "Tarea 2",
        complete: true,
        taskDate: "2024-09-29",
        persons: [
          {
            id: 3,
            personName: "Carlos Rodríguez",
            age: 35,
            personSkills: ["Python", "Django", "REST APIs"]
          },
          {
            id: 4,
            personName: "Ana Martínez",
            age: 28,
            personSkills: ["JavaScript", "React", "Redux"]
          },
          {
            id: 5,
            personName: "Luis Fernández",
            age: 40,
            personSkills: ["C#", ".NET", "Azure"]
          }
        ]
      },
      {
        id: 3,
        taskName: "Tarea 3",
        complete: false,
        taskDate: "2024-10-10",
        persons: [
          {
            id: 6,
            personName: "Sofía López",
            age: 22,
            personSkills: ["HTML", "CSS", "JavaScript"]
          },
          {
            id: 7,
            personName: "Miguel Torres",
            age: 32,
            personSkills: ["Node.js", "Express", "MongoDB"]
          }
        ]
      },
      {
        id: 4,
        taskName: "Tarea 4",
        complete: true,
        taskDate: "2024-10-15",
        persons: [
          {
            id: 8,
            personName: "Laura Ramírez",
            age: 27,
            personSkills: ["Vue.js", "Vuex", "Vuetify"]
          }
        ]
      },
      {
        id: 5,
        taskName: "Tarea 5",
        complete: false,
        taskDate: "2024-10-21",
        persons: [{
          id: 6,
          personName: "Sofía López",
          age: 22,
          personSkills: ["HTML", "CSS", "JavaScript"]
        }]
      }
    ];
    return of(data).pipe(delay(1500))
  }

  createTask(task: ITask): Observable<any> {
    console.log("CreateTaskService: ", task)
    return this.http.post(`${this.baseUrl}/posts`, task);
  }

  updateTaskList(tasks: ITask[]) {
    this.taskList = tasks;
    this.taskListState.next(this.taskList);
  }

  updateTask(task: ITask){
    const targetTask = this.taskList.map(item => {
      if(item.id !== task.id){
        return item;
      }
      return task;
    });
    this.taskList = targetTask;
    this.taskListState.next(this.taskList);
  }

  addTask(tasks: ITask){
    this.taskList.push(tasks);
    this.taskListState.next(this.taskList);
  }

}
