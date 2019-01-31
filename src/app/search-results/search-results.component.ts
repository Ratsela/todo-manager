import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoServiceService } from '../todo-service.service';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public todos:Todo[] = [];
  private todo:Todo;
  public searchedBy:string = "";

  constructor(private route: ActivatedRoute,private todoService:TodoServiceService) { }

  ngOnInit() {

    let searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    let searchByTitle = this.route.snapshot.paramMap.get("searchByTitle");

    console.log("Query parameters are .....",searchTerm + "<<<>>>" + searchByTitle);
    
    if(searchByTitle === 'true'){
      this.todoService.searchByTitle(searchTerm).subscribe(resp => {
        this.todos = resp;
        this.searchedBy = "title";
        console.log("Todo results by title.........",this.todos);
      },error => {
        console.log("Error searching by term.............",error);
      });
    }else if(searchByTitle === 'false'){
      this.todoService.searchByCategory(searchTerm.toUpperCase()).subscribe(resp => {
        this.todos = resp;
        this.searchedBy = "category"
        console.log("Todo results by category ",this.todos);
      },error => {
        console.log("Error searching by category.......",error);
      });
    }
  }


  openTodo(id:number){
    console.log("Open todo with id = ",id);
    return false;
  }

  deleteTodo(id:number){
    console.log("delete todo with id = ",id);

    this.todoService.loadTodo(id).subscribe(resp => {
      this.todo = resp;
    })

    this.todoService.deleteTodo(id).subscribe(resp => {
      console.log("Todo deleted............",resp);
      this.todos.splice(this.todos.indexOf(this.todo),1);
    })
  }

  editTodo(id:number){
    console.log("edit todo with id = ",id);
  }

}
