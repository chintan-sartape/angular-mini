import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service'
import {Employee  } from '../../employee'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string

  constructor( private employeesService: EmployeesService ) { }

  ngOnInit(): void {
  }

  loginFormValue(value: any) {
    console.log(value)
    return this.employeesService
      .loginEmployees(value)
      .subscribe(
        value => console.log('login success'),
        error => this.error = error
      );
  }

}
