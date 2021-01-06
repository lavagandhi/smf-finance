import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { LoanProgressService } from 'src/app/services/loan-progress/loan-progress.service';
import { SuccessService } from 'src/app/services/success.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-loan-process',
  templateUrl: './loan-process.component.html',
  styleUrls: ['./loan-process.component.scss']
})
export class LoanProcessComponent implements OnInit {

  title = 'Add New';
  btnName = 'Submit';
  validateForm: FormGroup;
  dropDownLists: any;
  constructor(
    private successService: SuccessService,
    private loanservice:LoanProgressService, 
    private tokenservice:TokenService, 
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private dropdownService: DropdownService) { }

  ngOnInit() {
    this.dropdownService.getEducation().subscribe(data => {
      this.dropDownLists = data;
    })
    this.validateForm = this.fb.group({
      loanamount: [null, [Validators.required]],
      repayment: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      interest: [null, [Validators.required]],
      insurance: [null, [Validators.required]],
      processfee: [null, [Validators.required]],
      purpose: [null, [Validators.required]]
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
      let sendData = {
        ...this.validateForm.value, applicantid: this.tokenservice.getstep('applicant')
      }
      this.loanservice.loanCreate(sendData).subscribe(data => {
        if (data) {
          this.tokenservice.savesteps('loan', (data.loanid));
          this.successService.ResponseMessage("success", "Loan Process added");
        }
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

  setProcessfee(amount) {
    this.validateForm.get('processfee').setValue(amount/100);
  }
}
