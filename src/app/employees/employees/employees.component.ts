import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service'
import { Employee } from '../../employee'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[]

  error: string
  
  // employee = new Employee()

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {

    this.employeesService
      .getEmployees()
      .subscribe(
        (data: Employee[]) => this.employees = data,
        error => this.error = error
      );
  
  }

  // onSubmit() {
  //   this.showPostForm = false;
  //   return this.employeesService.createEmployees(this.employee).subscribe(
  //       data => this.employees.push(data),
  //       error => this.error = error
  //     );
  // }

}
