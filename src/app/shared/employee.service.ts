import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Application internal imports
import { Employee } from './employee.model';
import { AppSettings } from '../constraints/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  list: Employee[];


  constructor(private http: HttpClient) { }

  /**
   * function-name: postEmployee
   * @param formData
   * description: using httpClient(http) and API_ENDPOINT post data form the form to the database
   */
  postEmployee(formData: Employee) {
    return this.http.post(AppSettings.API_ENDPOINT + 'post-employee', formData);
  }

  /**
   * function-name: refreshList
   * description: using httpClient(http) and API_ENDPOINT get data form the database to the form
   */
  refreshList() {
    this.http.get(AppSettings.API_ENDPOINT + 'get-employee')
      .toPromise().then(res => this.list = res as Employee[]);
  }

  /**
   * function-name: putEmployee
   * @param formData
   * description: using httpClient(http) and API_ENDPOINT update data into database with the form value according to the EmployeeID
   */
  putEmployee(formData: Employee) {
    return this.http.put(AppSettings.API_ENDPOINT + 'put-employee/' + formData.EmployeeID, formData);
  }

  /**
   * function-name: deleteEmployee
   * @param id
   * description: using httpClient(http) and API_ENDPOINT delete data from database according to the id
   */
  deleteEmployee(id: number) {
    return this.http.delete(AppSettings.API_ENDPOINT + 'delete-employee/' + id);
  }
}
