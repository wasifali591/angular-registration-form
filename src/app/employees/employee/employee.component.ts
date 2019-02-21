import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }


  /**
   * function-name: resetForm
   * @param form
   * description: check the form value if not empty then reset
   */
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      EmployeeID: null,
      FullName: '',
      Position: '',
      EmpCode: '',
      Mobile: ''
    };
  }

  /**
   * function-name:onSubmit
   * @param form
   * description: onsubmit peform two task depending on EmployeeID value
   *  -- if EmployeeID is null then execute the insert operation
   *  -- if EmployeeID is not null the update the corosponding fields related to the id with new value
   */
  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  /**
   * function-name: insertRecord
   * @param form
   * description: insert new record into the database with the form value
   */
  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(res => {
      this.toastr.success('Inserted Successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  /**
   * function-name:updateRecord
   * @param form
   * description: update record with the form value
   */
  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {
      this.toastr.info('Updated Successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });

  }

}
