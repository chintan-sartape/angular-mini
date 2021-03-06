import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Employee } from '../employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  serverUrl = 'http://localhost:3000/'

  
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // }

  constructor(private http: HttpClient) { 
    console.log('Employee service loaded')
  }

  getEmployees() : Observable<any[]> {
    return this.http.get<Employee[]>(this.serverUrl + 'employees')
    .pipe(
      catchError(this.handleError)
      );
    }
    
  getEmployeeProfile(employee: any) {
    let header = new HttpHeaders().set(
      "Authorization" , "Bearer " + localStorage.getItem("token")
    );
    return this.http.get(this.serverUrl + 'employees/' + employee, {headers:header} )
      .pipe(
        catchError(this.handleError)
      );
  }

  loginEmployees(employee: Employee) {
    // console.log(employee)
    return this.http.post<Employee>(this.serverUrl + 'employees/login', employee)
    .pipe(
      catchError(this.handleError)
    )

  }

  createEmployees (employee: Employee) {
    // console.log(employee)
    return this.http.post<Employee>(this.serverUrl + 'employees', employee)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateEmployees (id: any, employee: Employee) {
    let header = new HttpHeaders().set(
      "Authorization" , "Bearer " + localStorage.getItem("token")
    );
    // console.log(employee)
    return this.http.patch<Employee>(this.serverUrl + 'employees/'+id, employee, {headers:header})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee (id: any) {
    let header = new HttpHeaders().set(
      "Authorization" , "Bearer " + localStorage.getItem("token")
    );
    return this.http.delete<Employee>(this.serverUrl + 'employees/'+ id, {headers: header})
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error.error}`)
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.' + error.error.error)
    return throwError(error.error.error)
    // return error;
  }
}
