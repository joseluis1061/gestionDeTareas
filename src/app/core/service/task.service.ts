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
        title: "Tarea 1",
        complete: false,
        dateTask: "2024-09-27",
        persons: [
          {
            id: 1,
            name: "Juan Pérez",
            age: 30,
            skills: ["Angular", "TypeScript", "CSS"]
          },
          {
            id: 2,
            name: "María Gómez",
            age: 25,
            skills: ["Java", "Spring Boot", "Hibernate"]
          }
        ]
      },
      {
        id: 2,
        title: "Tarea 2",
        complete: true,
        dateTask: "2024-09-29",
        persons: [
          {
            id: 3,
            name: "Carlos Rodríguez",
            age: 35,
            skills: ["Python", "Django", "REST APIs"]
          },
          {
            id: 4,
            name: "Ana Martínez",
            age: 28,
            skills: ["JavaScript", "React", "Redux"]
          },
          {
            id: 5,
            name: "Luis Fernández",
            age: 40,
            skills: ["C#", ".NET", "Azure"]
          }
        ]
      },
      {
        id: 3,
        title: "Tarea 3",
        complete: false,
        dateTask: "2024-10-10",
        persons: [
          {
            id: 6,
            name: "Sofía López",
            age: 22,
            skills: ["HTML", "CSS", "JavaScript"]
          },
          {
            id: 7,
            name: "Miguel Torres",
            age: 32,
            skills: ["Node.js", "Express", "MongoDB"]
          }
        ]
      },
      {
        id: 4,
        title: "Tarea 4",
        complete: true,
        dateTask: "2024-10-15",
        persons: [
          {
            id: 8,
            name: "Laura Ramírez",
            age: 27,
            skills: ["Vue.js", "Vuex", "Vuetify"]
          }
        ]
      },
      {
        id: 5,
        title: "Tarea 5",
        complete: false,
        dateTask: "2024-10-21",
        persons: [{
          id: 6,
          name: "Sofía López",
          age: 22,
          skills: ["HTML", "CSS", "JavaScript"]
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

  addTask(tasks: ITask){
    this.taskList.push(tasks);
    this.taskListState.next(this.taskList);
  }
}
