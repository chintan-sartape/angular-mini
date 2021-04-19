import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  title: string = 'Registration'


  _id: any
  
  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      console.log('Authentication registration loaded')
      this._id = this.route.snapshot.params.id
      if (this._id) {
        this.title = 'Update employee'
        this.employeesService
      .getEmployeeProfile(this._id)
      .subscribe(
        (data: Employee) => {
                              this.employee = data
                            },
        error => this.error = error
      );
      }
    }
      
  ngOnInit(): void {
  }

  registerFormValue(data: any) {
    
    return this.employeesService
      .createEmployees(data)
      // .subscribe(
      //   data => console.log(data),
      //   error => this.error = error
      // );

      .subscribe({
        next: () => {
            this.router.navigate(['../login'], 
            { relativeTo: this.route });
        },
        error: error => {
          this.error = error
        }
      });
  }
}
