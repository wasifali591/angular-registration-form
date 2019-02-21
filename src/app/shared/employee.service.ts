import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  list: Employee[];

  // rootURL is the variable to hold the similar part of the url
  readonly rootURL = 'http://localhost/angular-slim-api/public/api/';
  constructor(private http: HttpClient) { }

  // read data from fromData and insert into the database
  postEmployee(formData: Employee) {
    return this.http.post(this.rootURL + 'post-employee', formData);
  }
  // fetch all data from the database and atore into an array Employee
  refreshList() {
    this.http.get(this.rootURL + 'get-employee')
      .toPromise().then(res => this.list = res as Employee[]).catch((er) => { console.log('error occured', er); });
  }

  // edit data depending on Employee ID
  putEmployee(formData: Employee) {
    return this.http.put(this.rootURL + 'put-employee/' + formData.EmployeeID, formData);
  }

  // edit data depending on Employee ID
  deleteEmployee(id: number) {
    return this.http.delete(this.rootURL + 'delete-employee/' + id);
  }
}
