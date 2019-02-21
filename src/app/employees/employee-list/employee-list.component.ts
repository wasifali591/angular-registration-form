import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// Application internal imports
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  /**
   * function-name: populateForm
   * @param emp
   * description: pupolate row value on to the form
   */
  populateForm(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  /**
   * function-name: onDelete
   * @param id
   * description: delete data to the corosponding id and refresh the table
   */
  onDelete(id: number) {
    if (confirm('Are you sure to delte this record?')) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Ddeleted Successfully', 'EMP. Register');
      });
    }
  }
}
