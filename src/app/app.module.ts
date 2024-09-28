import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BannerComponent } from './shared/components/header/banner.component';
import { TaskModule } from './modules/task/task.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    BannerComponent,
    TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
