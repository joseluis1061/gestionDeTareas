import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskFormUpdateComponent } from './components/task-form-update/task-form-update.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: 'new-task',
    component: TaskFormComponent
  },
  {
    path: 'update-task/:id',
    component: TaskFormUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
