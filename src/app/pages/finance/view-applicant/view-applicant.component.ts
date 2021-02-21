import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';
import { CenterService } from 'src/app/services/center/center.service';
import { GroupService } from 'src/app/services/group/group.service';
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

  listOfData: any = [];
  centerdata: any = [];
  groupdata: any = [];
  searchValue = '';
  searchid = '';
  visible = false;
  modalvisible: boolean = false;
  visibleid = false;
  loanstatus: string;
  applicantid: string;
  listOfDisplayData: any = [];
  constructor(
    private router: Router,
    private modal: NzModalService,
    private centerservice: CenterService,
    private groupservices: GroupService,
    private applicantCreateService: ApplicantCreateService,
    private successService: SuccessService) { }

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
    this.centerservice.getCenter().subscribe(centerdata => {
      this.centerdata = centerdata;
      this.groupservices.getGroup().subscribe(groupdata => {
        this.groupdata = groupdata;

        this.applicantCreateService.getallfulldetails().subscribe(data => {

          this.listOfData = [...data].map(m => {
            m.centername = this.centerdata.find(c => c.centerid === m.centerid)?.centername;
            m.groupname = this.groupdata.find(c => c.groupid === m.groupid)?.groupname;
            m.installmentday = this.groupdata.find(c => c.groupid === m.groupid)?.installmentday;
            return m;
          });
          this.listOfDisplayData = [...this.listOfData];
        })
      })
    })

  }

  create(): void {
    this.router.navigate(['/applicant/create']);
  }

  edit(id): void {
    this.router.navigate(['/applicant/edit/' + id]);
  }
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.applicantname.indexOf(this.searchValue) !== -1);
  }
  searchbyid(): void {
    this.visibleid = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.formid.indexOf(this.searchid) !== -1);
  }
  resetid() {
    this.searchid = '';
    this.searchbyid();
  }
  reset(): void {
    this.searchValue = '';
    this.search();
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

  gotoViewdetail(applicantid) {
    this.router.navigate(['/view-details/' + applicantid])
  }

  chooseLoanStatus(applicantid) {
    this.applicantid = applicantid;
    this.modalvisible = true;
  }

  handleOk() {
    this.applicantCreateService.loanstatusupdate(this.applicantid, this.loanstatus).subscribe(data => {
      if (data) {
        this.successService.ResponseMessage("success", "Applicant Loan Status Update");
        this.ngOnInit();
      }
    })
  }

  handleCancel() {
    this.modalvisible = false;
  }
}
