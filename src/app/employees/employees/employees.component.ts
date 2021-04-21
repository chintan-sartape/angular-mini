import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) { 
    console.log('Employees - employees loaded')
  }

  ngOnInit() {

    console.log('token', localStorage.getItem('token'));
    this.getEmployees();
    
  }
  
  getEmployees() {
    this.employeesService
      .getEmployees()
      .subscribe(
        (data: Employee[]) => this.employees = data,
        error => this.error = error
      );
  }

  viewEmployee(employee: Employee) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/employees', employee._id])
    } else {
      this.router.navigate(['/login'])
    }
  }

  editEmployee(employee: Employee) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/employees', employee._id, 'edit'])
    } else {
      this.router.navigate(['/login'])
    }
  }
  
  deleteEmployee(employee: any) {

    if (localStorage.getItem('token')) {
    
      if(confirm("Are you sure to delete "+employee.name)) {
        // console.log("Implement delete functionality here");
        this.employeesService
          .deleteEmployee(employee._id)   // delete employee service call
          .subscribe(
            () => {
              this.getEmployees();    // on success call getEmployees()
            },
            (error) => this.error = error
          )
      }
    } else {
      this.router.navigate(['/login'])
    }
  }

}
