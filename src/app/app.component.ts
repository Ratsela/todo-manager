import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from './todo-service.service';
import { Todo } from './model/todo.model';
import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private router:Router){

  }
  
  ngOnInit(): void {
    this.router.navigate(['list-todos'])
  }
  

}
