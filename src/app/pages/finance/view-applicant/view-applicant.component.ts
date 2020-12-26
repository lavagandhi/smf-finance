import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
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

  listOfData: Person[] = [
    {
      id: '1',
      loanaccountno: 'John Brown',
      goldloanbranch: 'New York',
      micropinbranch: 'New York',
      existingcenter: 'New York',
      centergroup: 'New York',
      existinggroup: 'New York',
      centeraddress: 'New York',
    },
    {
      id: '2',
      loanaccountno: 'Jim Green',
      goldloanbranch: 'London',
      micropinbranch: 'London',
      existingcenter: 'London',
      centergroup: 'London',
      existinggroup: 'London',
      centeraddress: 'London',
    },
    {
      id: '3',
      loanaccountno: 'Joe Black',
      goldloanbranch: 'Sidney',
      micropinbranch: 'Sidney',
      existingcenter: 'Sidney',
      centergroup: 'Sidney',
      existinggroup: 'Sidney',
      centeraddress: 'Sidney',
    },
  ];

  constructor(private router: Router, private modal: NzModalService) {}

  ngOnInit() {}

  create(): void {
    this.router.navigate(['/applicant/create']);
  }

  edit(id): void {
    this.router.navigate(['/applicant/edit/' + id]);
  }

  view(id): void {
    this.router.navigate(['/applicant/view-details/' + id]);
  }

  delete(id): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('success');
      },
      nzCancelText: 'No',
      nzOnCancel: () => {},
    });
  }

}
