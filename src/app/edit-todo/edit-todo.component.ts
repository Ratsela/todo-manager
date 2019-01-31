import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TodoServiceService } from '../todo-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  public day:number = 0;
  public month:number = 0;
  public year:number = 0;
  public category:string = "HOME";

  public todo:Todo = null;

  constructor(private todoService:TodoServiceService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    let todoId = parseInt(this.route.snapshot.paramMap.get('todoId'));
    this.todoService.loadTodo(todoId).subscribe(resp => {
      this.todo = resp;
      this.category = this.todo.category;
    },error => {
      console.log("Error loading todo .......",error);
    });
  }

  selectCategory(category:any){
    console.log("Category selected = ",category);
    if(category === '0'){
      this.category = this.todo.category;
      console.log("Zero ",this.category);
    }else{
      this.category = category;
    }
  }

  onDateSelect(e:any){
    console.log("Select date.....",e);
    let date:NgbDate = e;
    this.day = date.day;
    this.year = date.year;
    this.month = date.month;
  }

  saveTodo(title:string,description:string){
    this.todoService.editTodo(this.todo.id,title,this.category,description,this.day,this.month,this.year).subscribe(resp => {
      console.log("Todo updated...............",resp);
      this.router.navigate(['list-todos']);
    },error => {
      console.log("Error editing todo ........",error);
    });
  }

}
