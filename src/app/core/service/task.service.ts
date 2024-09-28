import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import { ITask } from 'src/app/models/task.model';
import { delay, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }



  getTasks(): Observable<ITask[]> {
    const data =       [
      {
        id: 1,
        title: "Tarea 1",
        complete: false,
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
}
