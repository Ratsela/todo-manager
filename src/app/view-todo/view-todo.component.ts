import { Component, OnInit, Input } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';
import { Todo } from '../model/todo.model';

declare var $: any;

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent implements OnInit {

  @Input() todoId:number;
  public todo:Todo;

  constructor(private todoService: TodoServiceService) { }

  ngOnInit() {
    console.log("Id for todo to be viewed.",this.todoId);
    this.loadTodo(this.todoId);
  }

  loadTodo(id:number){
    this.todoService.loadTodo(id).subscribe(resp => {
      this.todo = resp;
      console.log("Todo loaded .....",this.todo);
    },error => {
      console.log("Error loading todo .......",error);
    });
  }

}
