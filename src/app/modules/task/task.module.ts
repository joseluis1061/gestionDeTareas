import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TaskCardComponent } from './components/task-card/task-card.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TaskRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class TaskModule { }
