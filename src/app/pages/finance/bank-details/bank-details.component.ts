import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';
import { BankDetailsService } from 'src/app/services/bank-details/bank-details.service';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { SuccessService } from 'src/app/services/success.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  id: any;

  @Output() parentdata: EventEmitter<boolean> = new EventEmitter<boolean>();
  applicantid: any;
  dropdownValue: any;
  constructor(private fb: FormBuilder,
    private bankDetailsService: BankDetailsService,
    private activatedRoute: ActivatedRoute,
    private successService: SuccessService,
    private tokenservice: TokenService,
    private dropdownService: DropdownService) { }

  validateForm: FormGroup;
  bankid: any;
  data: any;

  ngOnInit() {
    this.id = sessionStorage.getItem("id");
    this.validateForm = this.fb.group({
      accountype: [null, [Validators.required]],
      accountholdername: [null, [Validators.required]],
      bankname: [null, [Validators.required]],
      branchname: [null, [Validators.required]],
      accountmode: [null, [Validators.required]],
      accno: [null, [Validators.required]],
      ifsccode: [null, [Validators.required]]
    });

    this.dropdownService.getEducation()
      .subscribe(data => {
        this.dropdownValue = data;
      });

    this.validateForm.valueChanges.subscribe(() => {
      if (this.validateForm.valid) {
        this.parentdata.emit(false);
      }
    });

    this.bankid = this.tokenservice.getstep('bank');
    if (this.bankid !== null) {
      this.bankDetailsService.editbank(this.bankid).subscribe(data => {
        delete data._id;
        delete data.createdate;
        delete data.applicantid;
        this.data = data;
        this.validateForm.patchValue(this.data);
      })
    }
  }

  submitBankForm() {
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
      if (this.bankid) {
        this.bankDetailsService.editbanksave(this.bankid, sendData).subscribe(data => {
          if (data) {
            this.successService.ResponseMessage("success", "Bank details Updated");
          }
        })
      }
      else {
        this.bankDetailsService.bankCreate(sendData).subscribe(data => {
          if (data) {
            this.tokenservice.savesteps('bank', (data.bankid));
            this.successService.ResponseMessage("success", "Bank details added");
          }
        })
      }

    }
  }

}
