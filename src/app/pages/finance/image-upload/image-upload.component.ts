import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';
import { CoApplicantService } from 'src/app/services/co-applicant/co-applicant.service';
import { SuccessService } from 'src/app/services/success.service';
import { TokenService } from 'src/app/services/token.service';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicantCreateService } from 'src/app/services/applicant-create/applicant-create.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  avatarUrl?: string;
  uploading = false;
  fileList: any = [

  ];
  fileListco = [];
  fileListcos = [];
  fileLista = [];
  fileListas = [];
  applicantid: any;
  coapplicantid: any
  constructor(private http: HttpClient, private msg: NzMessageService,

    private coApplicantService: CoApplicantService,
    private tokenservice: TokenService,
    private dropdownservice: DropdownService,
    private activatedRoute: ActivatedRoute,
    private applicantCreateService: ApplicantCreateService,
    private sanitizer: DomSanitizer) {

  }
  ngOnInit() {
    this.coapplicantid = this.tokenservice.getstep('co-applicant');
    this.applicantid = this.tokenservice.getstep('applicant');
  }

  handleChange(info: NzUploadChangeParam, type): void {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);

    if (type === 'applicant') {
      this.fileLista = fileList
    }
    else if (type === 'coapplicant') {

      this.fileListco = fileList
    }
    else if (type === 'applicantsign') {

      this.fileListas = fileList
    }
    else if (type === 'coapplicantsign') {
      this.fileListcos = fileList
    }

  }

  saveimage() {
    let obj = {
      applicantimage: this.fileLista[0]?.thumbUrl,
      applicantid: this.applicantid,
      coapplicantid: this.coapplicantid,
      applicantsign: this.fileListas[0]?.thumbUrl,
      coapplicantimage: this.fileListco[0]?.thumbUrl,
      coapplicantsign: this.fileListcos[0]?.thumbUrl
    };
    return this.applicantCreateService.uploadimage(obj)
  }
}
