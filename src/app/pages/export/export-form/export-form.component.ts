import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';
import { CenterService } from 'src/app/services/center/center.service';
import { ExportService } from 'src/app/pages/export/export.service';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-export-form',
  templateUrl: './export-form.component.html',
  styleUrls: ['./export-form.component.scss']
})
export class ExportFormComponent implements OnInit {
  title = 'Export';
  centers: any = [];
  groups: any = [];
  listOfData: Array<any> = [
    { name: 'Applicant', exportname: 'applicant' },
    { name: 'Co Applicant', exportname: 'coapplicant' },
    { name: 'Bank', exportname: 'bank' },
    { name: 'Business', exportname: 'business' },
    { name: 'Loan', exportname: 'loan' },
  ];

  constructor(private exportservice: ExportService, private groupservice: GroupService, private centerservice: CenterService, private applicantservice: ApplicantCreateService) { }

  ngOnInit() {
    this.centerservice.getCenter().subscribe(data => {
      this.centers = data;
    })

    this.groupservice.getGroup().subscribe(data => {
      this.groups = data;
    })
  }

  ExportData(exportname) {
    this.applicantservice.exportData(exportname).subscribe(data => {
      const resultArray = data.map((m) => {
        let centerobj = this.centers.find(f => f.centerid === m.centerid);
        let groupobj = this.groups.find(f => f.groupid === m.groupid);
        delete m.centerid;
        delete m.groupid;
        delete m._id;
        delete m.createdat;
        delete m.applicantid;
        delete m.bankid;
        delete m.coapplicantid;
        delete m.businessid;
        delete m.loanid;
        return { ...m, centername: centerobj.centername, groupname: groupobj.groupname };
      })
      this.exportservice.downloadFile(resultArray, exportname)
    })
  }


}
