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
  fileList: NzUploadFile[] = [
  ];
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

  handleChange(info: NzUploadChangeParam,type): void {
    console.log(type)
   this.getBase64(info.file!.originFileObj!, (img: string) => {
    this.avatarUrl = img;
  });
const obj = {
  uid: type,
  name: info.file.name,
  url: '',
  base64:this.avatarUrl,
}
if(this.avatarUrl){
  this.fileList.push(obj);
}
   console.log(this.fileList)
 }

 private getBase64(img: File, callback: (img: string) => void): void {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result!.toString()));
  reader.readAsDataURL(img);
}
}
