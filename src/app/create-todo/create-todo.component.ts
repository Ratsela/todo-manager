import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoServiceService } from '../todo-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  //todoForm:FormGroup;

  public day:number;
  public month:number;
  public year:number;
  public category:string = "HOME";

  constructor(private todoService:TodoServiceService,private router:Router) {
    // this.todoForm = this.formBuilder.group({
    //   'dueDate': ['',Validators.required]
    // });
  }

  ngOnInit() {
  }

  selectCategory(category:any){
    console.log("Category selected = ",category);
    this.category = category;
  }

  saveTodo(title:string,description:string){
    this.todoService.createTodo(title,this.category,description,this.day,this.year,this.month).subscribe(resp => {
      console.log("Server response ..............",resp);
      this.router.navigate(['/list-todos']);
    },error => {
      console.log("Error creating todo .........",error);
    });
    
  }

  onDateSelect(e:any){
    
    let date:NgbDate = e;
    this.day = date.day;
    this.year = date.year;
    this.month = date.month;
    console.log("Date select ....",date.year + "  " + date.month + "  " + date.day);
  }

}
