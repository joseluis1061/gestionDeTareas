import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import { ITask } from 'src/app/models/task.model';
import { BehaviorSubject, delay, Observable, of, map, tap } from 'rxjs';
import { initTaskList } from '../data/initTaskList.data';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl: string = "https://jsonplaceholder.typicode.com";

  private taskList: ITask[] = [];
  private taskListState = new BehaviorSubject<ITask[]>([]);
  public taskListState$ =this.taskListState.asObservable();

  // private taskSelect!: ITask;
  private taskSelectedState = new BehaviorSubject<ITask | null>(null);
  public taskSelectedState$ =this.taskSelectedState.asObservable();


  constructor(
    private http: HttpClient
  ) { }


  getTasks(): Observable<ITask[]> {
    return of(initTaskList).pipe(delay(1500))
  }

  createTask(task: ITask): Observable<any> {
    console.log("CreateTaskService: ", task)
    return this.http.post<ITask>(`${this.baseUrl}/posts`, task).pipe(
      tap(response => {
        response.id = Math.floor(Math.random() * (99999999 - 2 + 1)) + 2;
      })
    );
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

  setTaskSelect(data: ITask) {
    this.taskSelectedState.next(data);
  }

}
