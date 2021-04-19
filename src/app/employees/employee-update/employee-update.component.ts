import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Employee } from '../../employee'
import { EmployeesService } from 'src/app/services/employees.service'

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  employees: Employee[]
  employee = new Employee()
  error: string

  updateForm: FormGroup;
  submitted = false;
  _id: any
  name: string
  email: any
  age: number
  position: string
  salary: number
  
  constructor(
    private employeesService: EmployeesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      console.log('employee update loaded')
      this._id = this.route.snapshot.params.id
      if (this._id) {
        this.employeesService
          .getEmployeeProfile(this._id)
          .subscribe(
            (data: Employee) => {
                        this.employee = data,
                        this.updateForm.patchValue({
                          name : this.employee.name,
                          age : this.employee.age,
                          email : this.employee.email,
                          position : this.employee.position,
                          salary : this.employee.salary,
                          password : this.employee.password,
                          confirmPassword : this.employee.password
                        })
                      },
            error => this.error = error
        );
      }
    }
      
  ngOnInit() {
    // this.updateForm = new FormGroup({
    //   name: new FormControl(''),
    //   age: new FormControl(''),
    // });
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: this.checkIfMatchingPasswords('password', 'confirmPassword')
    });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  updateEmployees() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.updateForm.invalid) {
          return;
      }
      console.log(this.updateForm.value)

      return this.employeesService
        .updateEmployees(this._id, this.updateForm.value)
        .subscribe({
          next: () => {
              this.router.navigate(['../'], 
              { relativeTo: this.route });
          },
          error: error => {
            this.error = error
          }
      });
  }

}
