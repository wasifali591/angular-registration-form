import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  list: Employee[];
  readonly rootURL = 'http://localhost/angular-slim/public/api/';
  constructor(private http: HttpClient) { }

  postEmployee(formData: Employee) {
    return this.http.post(this.rootURL + 'post-employee', formData);
  }
  refreshList() {
    this.http.get(this.rootURL + 'get-employee')
      .toPromise().then(res => this.list = res as Employee[]);
  }
  putEmployee(formData: Employee) {
    return this.http.put(this.rootURL + 'put-employee/' + formData.EmployeeID, formData);
  }
  deleteEmployee(id: number) {
    return this.http.delete(this.rootURL + 'delete-employee/' + id);
  }
}
