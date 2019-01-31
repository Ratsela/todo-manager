import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, TodoPage } from './model/todo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  createTodoUrl = environment.backendAppUrl + "/api/todo/create";
  deleteTodoUrl = environment.backendAppUrl + "/api/todo/delete";
  editTodoUrl = environment.backendAppUrl + "/api/todo/edit"; 
  loadTodosUrl = environment.backendAppUrl + "/api/todo/list";
  loadTodoUrl = environment.backendAppUrl + "/api/todo/load";
  searchByTitleUrl = environment.backendAppUrl + "/api/todo/search/title";
  searchByCategoryUrl = environment.backendAppUrl + "/api/todo/search/category";
  markCompeteUrl = environment.backendAppUrl + "/api/todo/complete";

  constructor(private httpClient:HttpClient) { }

  createTodo(title:string,category:string,description:string,day:number,year:number,month:number): Observable<any>{
    let params = new HttpParams()
      .set("title",title)
      .set("category",category)
      .set("description",description)
      .set("day",day + "")
      .set("month",month + "")
      .set("year",year + ""); 

    return this.httpClient.post(this.createTodoUrl,null,{params:params});
  }

  deleteTodo(id:number):Observable<any>{
    let fullUrl = this.deleteTodoUrl + "/" + id;
    return this.httpClient.get(fullUrl);
  }

  editTodo(id:number,title:string,category:string,description:string,day:number,month:number,year:number): Observable<Todo> {
    let params = new HttpParams()
      .set("id",id + "")
      .set("title",title)
      .set("category",category)
      .set("description",description)
      .set("day",day + "")
      .set("month",month + "")
      .set("year",year + ""); 

      return this.httpClient.post<Todo>(this.editTodoUrl,null,{params:params});
  }

  loadTodos(pageNumber:number): Observable<TodoPage> {
    let params = new HttpParams()
      .set('size', 5 + "")
      .set('page', pageNumber +"");
    
      return this.httpClient.get<TodoPage>(this.loadTodosUrl,{params:params})
      .pipe(map(resp => {let formatedTodos = resp.content.map(Todo.createInstance);
        return new TodoPage(
            resp.number,
            resp.totalPages,
            resp.totalElements,
            resp.size,
            resp.first,
            resp.last,
            formatedTodos
        )
      }
      ));
    
  }

  loadTodo(id:number): Observable<Todo> {
    let fullUrl = this.loadTodoUrl + "/" + id;
    return this.httpClient.get<Todo>(fullUrl);
  }

  searchByTitle(title:string): Observable<Todo[]> {
    let fullUrl = this.searchByTitleUrl + "/" + title;
    return this.httpClient.get<Todo[]>(fullUrl);
  }

  searchByCategory(category:string): Observable<Todo[]> {
    let fullUrl = this.searchByCategoryUrl + "/" + category;
    return this.httpClient.get<Todo[]>(fullUrl);
  }

  markAsComplete(todoId:number): Observable<Todo> {
    let params = new HttpParams().set("todoId",todoId + "");

    return this.httpClient.post<Todo>(this.markCompeteUrl,null,{params:params});
  }
}
