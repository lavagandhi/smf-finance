import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GroupService } from 'src/app/services/group/group.service';
import { CenterService } from 'src/app/services/center/center.service';
import { SuccessService } from 'src/app/services/success.service';
interface Person {
  id: string;
  name: string;
  address: string;
}
@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {

  listOfData: any = [];

  constructor(
    private router: Router,
    private modal: NzModalService,
    private groupService: GroupService,
    private centerservice: CenterService,
    private successService: SuccessService
  ) { }

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
    this.centerservice.getCenter().subscribe(centerdata => {
      this.groupService.getGroup().subscribe(data => {
        this.listOfData = data.map(m => {
          let centerobj = centerdata.find(f => f.centerid === m.centerid);

          if (centerobj)
            return { ...m, centername: centerobj.centername };
          return { ...m };
        })
      })
    })
  }

  create(): void {
    this.router.navigate(['/group/create']);
  }

  edit(id): void {
    this.router.navigate(['/group/edit/' + id]);
  }

  delete(id): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.groupService.deleteGroup(id).subscribe(data => {
          if (data) {
            this.successService.ResponseMessage("success", "Group Deleted");
            this.ngOnInit();
          }
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => { },
    });
  }


}
