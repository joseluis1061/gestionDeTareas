import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
