import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
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

  uploading = false;
  fileList = [];
  applicantid: any;
  constructor(private http: HttpClient, private msg: NzMessageService,
    
    private coApplicantService: CoApplicantService,
    private successService: SuccessService,
    private tokenservice: TokenService,
    private dropdownservice: DropdownService,
    private activatedRoute: ActivatedRoute,
    private applicantCreateService: ApplicantCreateService,
		private sanitizer: DomSanitizer) {
      if(this.activatedRoute.snapshot.paramMap.get('id') !=null || this.activatedRoute.snapshot.paramMap.get('id') !=undefined){
				this.applicantid=this.activatedRoute.snapshot.paramMap.get('id')
			}
			else if(this.tokenservice.getstep('applicant') !=null || this.tokenservice.getstep('applicant') !=undefined){
				this.applicantid = this.tokenservice.getstep('applicant');
			}
		console.log(this.applicantid,this.tokenservice.getstep('applicant'))
    }
  ngOnInit(){
  
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

 
  transformFile = (file: NzUploadFile) => {
    return new Observable((observer: Observer<Blob>) => {
      const reader = new FileReader();
      // tslint:disable-next-line:no-any
      reader.readAsDataURL(file as any);
      reader.onload = () => {
    this.fileList=[...this.fileList,
      {
        url : reader.result,
        pictype : "applicant"
      }]
   
  
  
		console.log(this.fileList);
      };
    });
}
transformFileSign = (file: NzUploadFile) => {
  return new Observable((observer: Observer<Blob>) => {
    const reader = new FileReader();
    // tslint:disable-next-line:no-any
    reader.readAsDataURL(file as any);
    reader.onload = () => {
      this.fileList=[...this.fileList,
        {
          url : reader.result,
          pictype : "applicantSign"
        }]
  console.log(this.fileList);
    };
  });
}
transformFileCo = (file: NzUploadFile) => {
    return new Observable((observer: Observer<Blob>) => {
      const reader = new FileReader();
      // tslint:disable-next-line:no-any
      reader.readAsDataURL(file as any);
      reader.onload = () => {
        this.fileList=[...this.fileList,
          {
            url : reader.result,
            pictype : "coapplicantSign"
          }]
		console.log(this.fileList);
      };
    });
}
transformFileCoSign = (file: NzUploadFile) => {
  return new Observable((observer: Observer<Blob>) => {
    const reader = new FileReader();
    // tslint:disable-next-line:no-any
    reader.readAsDataURL(file as any);
    reader.onload = () => {
      this.fileList=[...this.fileList,
        {
          url : reader.result,
          pictype : "coapplicant"
        }]
  console.log(this.fileList);
    };
  });
}
}
