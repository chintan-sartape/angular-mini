import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeesService } from 'src/app/services/employees.service'

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  employee: Employee
  error: string
  name: string
  email: any
  age: number
  position: string
  salary: number
  password: any
  
  _id = this.ActivateRoute.snapshot.params.id;

  constructor( 
    private ActivateRoute: ActivatedRoute,
    private employeesService: EmployeesService
    ) {
    console.log('Employees - employees profile loaded')
   }

  ngOnInit(): void {
    this.employeesService
      .getEmployeeProfile(this._id)
      .subscribe(
        (data: Employee) => {
                              this.employee = data, 
                              this.name = this.employee.name,
                              this.email = this.employee.email,
                              this.age = this.employee.age,
                              this.position = this.employee.position,
                              this.salary = this.employee.salary,
                              this.password = this.employee.password
                            },
        error => this.error = error
      );

    
  }

}
