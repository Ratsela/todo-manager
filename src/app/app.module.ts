import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoServiceService } from './todo-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewTodoComponent } from './view-todo/view-todo.component';
import { NgbModule,NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MomentModule } from 'ngx-moment';
import { SearchResultsComponent } from './search-results/search-results.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

//import * as $ from 'jquery'

export const TODO_ROUTES: Routes = [
  {path:'list-todos',component:TodoListComponent},
  {path:'create-todo',component:CreateTodoComponent},
  {path:'search/:searchByTitle/:searchTerm',component:SearchResultsComponent},
  {path:'edit-todo/:todoId',component:EditTodoComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ViewTodoComponent,
    CreateTodoComponent,
    TodoListComponent,
    SearchResultsComponent,
    EditTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(TODO_ROUTES)
  ],
  providers: [TodoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
