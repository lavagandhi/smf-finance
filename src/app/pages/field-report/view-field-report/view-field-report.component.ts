import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';
import { CenterService } from 'src/app/services/center/center.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { GroupService } from 'src/app/services/group/group.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-view-field-report',
  templateUrl: './view-field-report.component.html',
  styleUrls: ['./view-field-report.component.scss']
})
export class ViewFieldReportComponent implements OnInit {

  applicantid: any;
  amount: number;
  isVisible: boolean = false;
  listOfData: any = [];
  title: string = 'Field Report';
  btnName: string = 'Submit';
  displayobj: any;
  groupdata: any = [];
  employies: any = [];
  constructor(private employeeservice: EmployeeService, private fb: FormBuilder) { }
  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
      employeeid: [null, [Validators.required]],
      collectiondate: [null, [Validators.required]],
    });

    this.employeeservice.getallemployee().subscribe(employies => {
      this.employies = employies;
    });
  }

  submitForm(): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    if (this.validateForm.valid) {
      this.employeeservice.getfieldreport(this.validateForm.value).subscribe(data => {
        console.log(data)
        this.listOfData = data;
        this.getEmployeeName();
      })
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  getEmployeeName() {
    const obj = this.employies.find(f => f.employeeid === this.validateForm.get('employeeid').value);
    if (obj) {
      this.displayobj = {
        collectiondate: this.validateForm.get('collectiondate').value,
        employeename: obj.employeename + ' - ' + obj.employeecode
      }
    }
  }
}

