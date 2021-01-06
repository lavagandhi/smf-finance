import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';
import { SuccessService } from 'src/app/services/success.service';
import { TokenService } from 'src/app/services/token.service';
interface Person {
  id: string;
  loanaccountno: string;
  goldloanbranch: string;
  micropinbranch: string;
  existingcenter: string;
  centergroup: string;
  existinggroup: string;
  centeraddress: string;
}

@Component({
  selector: 'app-view-applicant',
  templateUrl: './view-applicant.component.html',
  styleUrls: ['./view-applicant.component.scss']
})
export class ViewApplicantComponent implements OnInit {

  listOfData = [];

  constructor(
    private tokenservice:TokenService,
    private router: Router, 
    private modal: NzModalService,
    private applicantCreateService: ApplicantCreateService,
    private successService: SuccessService) { }

  ngOnInit() {
    this.applicantCreateService.getAllapplicant().subscribe(data => {
      this.listOfData = data;
    })
  }

  create(): void {
    this.router.navigate(['/applicant/create']);
  }

  edit(id): void {
    this.router.navigate(['/applicant/edit/' + id]);
  }

  delete(id): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.applicantCreateService.deleteapplicant(id).subscribe(data => {
          if (data) {
            this.successService.ResponseMessage("success", "Applicant Deleted");
            this.ngOnInit();
          }
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => { },
    });
  }

}
