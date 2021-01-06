import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantDetailsComponent } from '../applicant-details/applicant-details.component';
import { BankDetailsComponent } from '../bank-details/bank-details.component';
import { BusinessDetailsComponent } from '../business-details/business-details.component';
import { CoApplicantDetailsComponent } from '../co-applicant-details/co-applicant-details.component';
import { IncomeDetailsComponent } from '../income-details/income-details.component';
import { LoanProcessComponent } from '../loan-process/loan-process.component';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.scss']
})
export class AddFinanceComponent implements OnInit {
  @ViewChild(ApplicantDetailsComponent) applicantDetailsComponent: ApplicantDetailsComponent;
  @ViewChild(BankDetailsComponent) bankDetailsComponent: BankDetailsComponent;
  @ViewChild(BusinessDetailsComponent) businessDetailsComponent: BusinessDetailsComponent;
  @ViewChild(CoApplicantDetailsComponent) coApplicantDetailsComponent: CoApplicantDetailsComponent;
  @ViewChild(IncomeDetailsComponent) incomeDetailsComponent: IncomeDetailsComponent;
  @ViewChild(LoanProcessComponent) loanProcessComponent: LoanProcessComponent;

  current = 0;
  index = 'first-content';
  applicantid: any;
  nextbutton: boolean = true;
  constructor(private activatedRoute: ActivatedRoute) {
    this.applicantid = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.applicantid === null) {
      this.nextbutton = true;
    }
    else {
      this.nextbutton = false;
    }
  }

  ngOnInit() {
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    if (this.index === 'first-content') {
      this.applicantDetailsComponent.submitApplicantForm();
      this.nextButtonCheck();
    } else if (this.index === 'Second-content') {
      this.coApplicantDetailsComponent.submitCoApplicantForm();
      this.nextButtonCheck();
    } else if (this.index === 'third-content') {
      this.loanProcessComponent.submitForm();
      this.nextButtonCheck();
    } else if (this.index === 'Fourth-content') {
      this.businessDetailsComponent.submitBusinessForm();
      this.nextButtonCheck();
    } else if (this.index === 'sixth-content') {
      this.bankDetailsComponent.submitBankForm();
      this.nextButtonCheck();
    }
    this.changeContent();

  }
  nextButtonCheck() {
    if (this.applicantid === null) {
      this.nextbutton = true;
    }
    else {
      this.nextbutton = false;
    }
  }
  submitedata(event) {
    this.nextbutton = event;
  }
  done() {
    this.bankDetailsComponent.submitBankForm();
    localStorage.clear();
    sessionStorage.clear();
  }
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'first-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.index = 'Fourth-content';
        break;
      }
      case 4: {
        this.index = 'fifth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

}
