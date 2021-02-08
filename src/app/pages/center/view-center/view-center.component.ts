import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CenterService } from 'src/app/services/center/center.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SuccessService } from 'src/app/services/success.service';
interface Person {
  id: string;
  name: string;
  address: string;
}
@Component({
  selector: 'app-view-center',
  templateUrl: './view-center.component.html',
  styleUrls: ['./view-center.component.scss']
})
export class ViewCenterComponent implements OnInit {
  listOfData: any = [];
  employeedetails: any = [];

  constructor(
    private router: Router,
    private successService: SuccessService,
    private centerService: CenterService,
    private modal: NzModalService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.centerService.getCenter().subscribe(data => {
      this.listOfData = data;
    })

    this.employeeService.getallemployee().subscribe(data => {
      this.employeedetails = data;
    })

  }

  create(): void {
    this.router.navigate(['/center/create']);
  }

  edit(id): void {
    this.router.navigate(['/center/edit/' + id]);
  }

  delete(id): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.centerService.deletecenter(id).subscribe(data => {
          if (data) {
            this.successService.ResponseMessage("success", "Center Deleted");
            this.ngOnInit();
          }
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => { },
    });
  }

  getemployeename(employeeid) {
    const obj = this.employeedetails.find(f => f.employeeid === employeeid);
    if (obj) {
      return obj.employeename;
    }
    return '-';
  }
}
