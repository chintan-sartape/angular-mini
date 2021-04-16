import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee'
import { EmployeesService } from 'src/app/services/employees.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employees: Employee[] = []
  
  employee = new Employee()

  error: string

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
  }

  registerFormValue(data: any) {

    // console.log(data)
    
    return this.employeesService
      .createEmployees(data)
      .subscribe(
        data => this.employees.push(data),
        error => this.error = error
      );
  }
}
