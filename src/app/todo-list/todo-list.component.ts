import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoServiceService } from '../todo-service.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todoList:Todo[] = [];
  public searchByTitle:boolean = false;
  public pageNumber:number = 0;
  public totalPages:number;
  public idToView:number;
  public todoToView:Todo = null;
  public markAsComplete:boolean = false;

  constructor(private todoService:TodoServiceService,private router:Router) { }

  ngOnInit() {
    this.listAll();
  }

  listAll(pageNumber:number = 0){
    this.todoService.loadTodos(pageNumber).subscribe(resp => {
      console.log("Server response = ",resp);
      this.todoList = resp.content;
      this.totalPages = resp.totalPages;
      console.log("Todo list = ",this.todoList);
    }, error => {
      console.log("Error loading todos .....................");
    });
  }

  searchTodo(searchTerm:string){
    console.log("Searching .......",searchTerm);
    this.router.navigate(['/search/',this.searchByTitle,searchTerm])
  }

  searchCheck(e:boolean){
    console.log("Search by title?",e);
    this.searchByTitle = e;
  }

  openTodo(id:number){
    console.log("Open todo with id = ",id);
    this.idToView = id;
    this.todoService.loadTodo(this.idToView).subscribe(resp => {
      this.todoToView = resp;
      console.log("View this todo <<<>>>",this.todoToView);
    },error => {

    });
    $('#view-todo-modal').modal("show");
    return false;
  }

  deleteTodo(id:number){
    console.log("delete todo with id = ",id);
    this.todoService.deleteTodo(id).subscribe(resp => {
      console.log("Todo deleted............",resp);
      this.listAll();
    })
  }

  editTodo(id:number){
    this.router.navigate(['/edit-todo',id]);
    console.log("edit todo with id = ",id);

  }

  next(){
    console.log("Going next ............");
    this.pageNumber += 1;
    if(this.pageNumber < this.totalPages -1){
      this.listAll(this.pageNumber);
    }else{
      this.pageNumber = this.totalPages -1;
      this.listAll(this.pageNumber);
    }
  }

  previous(){
    console.log("Going back ............");
    this.pageNumber -= 1;
    if(this.pageNumber > 0){
      this.listAll(this.pageNumber);
    }else{
      this.pageNumber = 0;
      this.listAll(this.pageNumber);
    }
  }

  createTodo(){
    this.router.navigate(['create-todo']);
  }

  markComplete(e:any){
    this.markAsComplete = e;
  }

  saveTodoStatus(){
    if(this.markAsComplete){
      this.todoService.markAsComplete(this.todoToView.id).subscribe(resp => {
        this.todoToView = resp;
        this.listAll();
        setTimeout(() => $('#view-todo-modal').modal("hide"),3000);
        console.log("Todo completed............");
      },error => {
        console.log("Error completing todo", error);
      });
    }
  }

}
