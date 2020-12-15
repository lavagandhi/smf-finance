import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
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

  listOfData: Person[] = [
    {
      id: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park'
    },
    {
      id: '2',
      name: 'Jim Green',
      address: 'London No. 1 Lake Park'
    },
    {
      id: '3',
      name: 'Joe Black',
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor(private router: Router, private modal: NzModalService,) { }

  ngOnInit() {
  }

  create(): void {
		this.router.navigate(['/group/create']);
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
          console.log('success')
			},
			nzCancelText: 'No',
			nzOnCancel: () => {},
		});
	}


}
