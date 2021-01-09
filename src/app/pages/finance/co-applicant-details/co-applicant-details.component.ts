import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';
import { CoApplicantService } from 'src/app/services/co-applicant/co-applicant.service';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { SuccessService } from 'src/app/services/success.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-co-applicant-details',
  templateUrl: './co-applicant-details.component.html',
  styleUrls: ['./co-applicant-details.component.scss']
})
export class CoApplicantDetailsComponent implements OnInit {
  data: any = [];
  id: any;
  dropDownLists: any;
  applicantid: any;
  coapplicantid: any
  constructor(private fb: FormBuilder,
    private coApplicantService: CoApplicantService,
    private successService: SuccessService,
    private tokenservice: TokenService,
    private dropdownservice: DropdownService,
    private activatedRoute: ActivatedRoute,
    private applicantCreateService: ApplicantCreateService,) {
    this.applicantid = this.activatedRoute.snapshot.paramMap.get('id');
  }
  validateForm: FormGroup;

  @Output() parentdata: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {

    this.id = sessionStorage.getItem("id");

    this.dropdownservice.getEducation().subscribe(data => {
      this.dropDownLists = data;
    });

    this.validateForm = this.fb.group({
      coapplicantname: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      relationtype: [null, [Validators.required]],
      dob: [null, [Validators.required]]
    });
    this.validateForm.valueChanges.subscribe(() => {
      if (this.validateForm.valid) {
        this.parentdata.emit(false);
      }
    });
    this.applicantCreateService.getapplicantdetails(this.applicantid).subscribe(data => {
      this.coapplicantid = data.coapplicantdata.coapplicantid;
      if (this.applicantid !== null) {
        this.coApplicantService.editcoApplicant(this.coapplicantid).subscribe(data => {
          delete data._id;
          delete data.createdate;
          delete data.applicantid;
          this.data = data;
          this.validateForm.patchValue(this.data);
        })
      }
    })
  }

  submitCoApplicantForm() {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    if (this.validateForm.valid) {
      let sendData = {
        ...this.validateForm.value, applicantid: this.tokenservice.getstep('applicant')
      }
      if (this.applicantid) {
        this.coApplicantService.editcosave(this.coapplicantid, sendData).subscribe(data => {
          if (data) {
            this.tokenservice.savesteps('co-applicant', (data.coapplicantid));
            this.successService.ResponseMessage("success", "Co Applicant added");
          }
        })
      }
      else {
        this.coApplicantService.coapplicantCreate(sendData).subscribe(data => {
          if (data) {
            this.tokenservice.savesteps('co-applicant', (data.coapplicantid));
            this.successService.ResponseMessage("success", "Co Applicant updated added");
          }
        })
      }
    }
  }

}
