import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private dropdownService: DropdownService) {
    this.applicantid = this.activatedRoute.snapshot.paramMap.get('id');
  }
  validateForm: FormGroup;

  ngOnInit() {
    this.id = sessionStorage.getItem("id");
    this.validateForm = this.fb.group({
      accountype: [null, [Validators.required]],
      accountholdername: [null, [Validators.required]],
      bankname: [null, [Validators.required]],
      branchname: [null, [Validators.required]],
      accountmode: [null, [Validators.required]],
      accno: [null, [Validators.required]],
      ifsccode: [null, [Validators.required]],

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
      this.bankDetailsService.bankCreate(sendData).subscribe(data => {
        if (data) {
          this.tokenservice.savesteps('bank', (data.bankid));
          this.successService.ResponseMessage("success", "Bank details added");
        }
      })
    }
  }

}
