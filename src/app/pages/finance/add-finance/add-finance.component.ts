import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantDetailsComponent } from '../applicant-details/applicant-details.component';
import { BankDetailsComponent } from '../bank-details/bank-details.component';
import { BusinessDetailsComponent } from '../business-details/business-details.component';
import { CoApplicantDetailsComponent } from '../co-applicant-details/co-applicant-details.component';
import { LoanProcessComponent } from '../loan-process/loan-process.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { SuccessService } from 'src/app/services/success.service';
import { TokenService } from 'src/app/services/token.service';

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
  @ViewChild(LoanProcessComponent) loanProcessComponent: LoanProcessComponent;
  @ViewChild(ImageUploadComponent) imageUploadComponent: ImageUploadComponent;


  current = 0;
  index = 'first-content';
  applicantid: any;
  nextbutton: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private successService: SuccessService,
    private tokenservice: TokenService,
    private router: Router
  ) {
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
      const returndata: any = this.applicantDetailsComponent.submitApplicantForm();
      returndata.returnobj.subscribe(data => {
        if (returndata.mode !== "Updated") {
          this.tokenservice.savesteps('applicant', (data.applicantid));
        }
        this.successService.ResponseMessage("success", "Applicant " + returndata.mode);
        this.nextButtonCheck();
      });

    } else if (this.index === 'Second-content') {
      const returndata: any = this.coApplicantDetailsComponent.submitCoApplicantForm();
      returndata.returnobj.subscribe(data => {
        if (returndata.mode !== "Updated") {
          this.tokenservice.savesteps('coapplicant', (data.coapplicantid));
        }
        this.successService.ResponseMessage("success", "Co applicant " + returndata.mode);
        this.nextButtonCheck();
      });
    } else if (this.index === 'third-content') {
      const returndata: any = this.loanProcessComponent.submitForm();
      returndata.returnobj.subscribe(data => {
        if (returndata.mode !== "Updated") {
          this.tokenservice.savesteps('loan', (data.loanid));
        }
        this.successService.ResponseMessage("success", "Loan " + returndata.mode);
        this.nextButtonCheck();
      });
    } else if (this.index === 'Fourth-content') {
      const returndata: any = this.businessDetailsComponent.submitBusinessForm();
      returndata.returnobj.subscribe(data => {
        if (returndata.mode !== "Updated") {
          this.tokenservice.savesteps('business', (data.businessid));
        }
        this.successService.ResponseMessage("success", "Business " + returndata.mode);
        this.nextButtonCheck();
      });
    } else if (this.index === 'fifth-content') {
      const returndata: any = this.bankDetailsComponent.submitBankForm();
      returndata.returnobj.subscribe(data => {
        if (returndata.mode !== "Updated") {
          this.tokenservice.savesteps('bank', (data.bankid));
        }
        this.successService.ResponseMessage("success", "Bank " + returndata.mode);
        this.nextButtonCheck();
      });
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
    this.imageUploadComponent.saveimage().subscribe(data => {
      this.successService.ResponseMessage("success", "Image added");
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/applicant/view'])
    })
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
