import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
interface Person {
  id: string;
  loangetlocation: string;
  loangetreason: string;
  amount: string;
  installment: string;
  duration: string;
  paymentinstallment: string;
  requestedloanamount: string;
}

@Component({
  selector: 'app-view-loan-process',
  templateUrl: './view-loan-process.component.html',
  styleUrls: ['./view-loan-process.component.scss'],
})
export class ViewLoanProcessComponent implements OnInit {
  listOfData: Person[] = [
    {
      id: '1',
      loangetlocation: 'John Brown',
      loangetreason: 'New York',
      amount: 'New York',
      installment: 'New York',
      duration: 'New York',
      paymentinstallment: 'New York',
      requestedloanamount: 'New York',
    },
    {
      id: '2',
      loangetlocation: 'Jim Green',
      loangetreason: 'London',
      amount: 'London',
      installment: 'London',
      duration: 'London',
      paymentinstallment: 'London',
      requestedloanamount: 'London',
    },
    {
      id: '3',
      loangetlocation: 'Joe Black',
      loangetreason: 'Sidney',
      amount: 'Sidney',
      installment: 'Sidney',
      duration: 'Sidney',
      paymentinstallment: 'Sidney',
      requestedloanamount: 'Sidney',
    },
  ];

  constructor(private router: Router, private modal: NzModalService) {}

  ngOnInit() {}

  create(): void {
    this.router.navigate(['/loan-process/create']);
  }

  edit(id): void {
    this.router.navigate(['/loan-process/edit/' + id]);
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
