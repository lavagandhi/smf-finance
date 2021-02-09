import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  applicantdetails: any;
  constructor(private route: ActivatedRoute, private applicatservice: ApplicantCreateService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.applicatservice.getapplicantdetails(data.id).subscribe(data => {
        this.applicantdetails = data;
      })
    })
  }

  calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}