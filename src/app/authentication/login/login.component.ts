import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service'

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  successMSG: boolean = false
  error: string = ''

  constructor( 
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    console.log('Authentication - login loaded')
  }

  ngOnInit(): void {
  }

  loginFormValue(value: any) {
    // console.log(value)
    return this.employeesService
      .loginEmployees(value)
      // .subscribe(
      //   successMSG => {this.successMSG = true, this.error = ''},
      //   error => this.error = error
      // )
      // .subscribe({
      //   next: (result: any) => {
      //     console.log('result'),
      //     console.log(result.token),
      //     this.successMSG = true, 
      //     this.error = '',
      //     this.router.navigate(['/'], 
      //     { relativeTo: this.route });
      //   },
      //   error: error => {
      //     this.error = error
      //   }
      // });
      .subscribe(
        (result: any) => {                // result
          // console.log(result.token),
          localStorage.setItem('token', result.token);
          this.successMSG = true, 
          this.error = '',
          this.router.navigate(['/'],
          { relativeTo: this.route });
        },
        (error) => {                      // error
          this.error = error
        },
        () => console.log('completed')    // complete
      );
  }

}
