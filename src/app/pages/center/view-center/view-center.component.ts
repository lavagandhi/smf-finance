import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CenterService } from 'src/app/services/center/center.service';
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

  constructor(
    private router: Router,
    private successService: SuccessService,
    private centerService: CenterService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.centerService.getCenter().subscribe(data => {
        this.listOfData = data;
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
}
