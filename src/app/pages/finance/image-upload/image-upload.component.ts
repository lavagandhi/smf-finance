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
  fileList :any = [
    
  ];
  fileListco = [];
  fileListcos = [];
  fileLista = [];
  fileListas = [];
  applicantid: any;
  coapplicantid: any
  constructor(private http: HttpClient, private msg: NzMessageService,
    
    private coApplicantService: CoApplicantService,
    private successService: SuccessService,
    private tokenservice: TokenService,
    private dropdownservice: DropdownService,
    private activatedRoute: ActivatedRoute,
    private applicantCreateService: ApplicantCreateService,
		private sanitizer: DomSanitizer) {
      
    }
  ngOnInit(){
    this.coapplicantid = this.tokenservice.getstep('co-applicant');
     this.applicantid = this.tokenservice.getstep('applicant');
     console.log(this.coapplicantid,this.applicantid)
  }

  handleChange(info: NzUploadChangeParam,type): void {
   
// if(type){
//   console.log(type)
    let fileList = [...info.fileList];

//    // 1. Limit the number of uploaded files
//    // Only to show two recent uploaded files, and old ones will be replaced by the new
   fileList = fileList.slice(-1);
//    // 2. Read from response and show file link
//    fileList = fileList.map(file => {
//      if (file.response) {
//        // Component will show file.url as link
//        file.url = file.response.url;
//      }
//      return file;
//    });
console.log(fileList,type)
// if(fileList[0].thumbUrl){
//   const obj = {
//     name: type,
//     base64:fileList[0].thumbUrl,
//     applicant : this.applicantid,
//     coapplicant : this.coapplicantid
//   }
  if(type === 'applicant'){
    this.fileLista=fileList
  }
  else if(type === 'coapplicant'){

    this.fileListco=fileList
  }
  else if(type === 'applicantsign'){
  
    this.fileListas=fileList
  }
  else if(type === 'coapplicantsign'){
    this.fileListcos=fileList
  }
 
  console.log(this.fileListcos,this.fileListco,this.fileLista,this.fileListas)
//   console.log(this.fileList)
//   console.log(fileList)
// }
// }
  
 }

//  private getBase64(img: File, callback: (img: string) => void): void {
//    console.log()
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result!.toString()));
//   reader.readAsDataURL(img);
// }

saveimage(){
    let obj = [{
    name: "applicant",
    base64:this.fileLista[0]?.thumbUrl,
    applicant : this.applicantid,
    coapplicant : this.coapplicantid
  },
  {
    name: "applicantsign",
    base64:this.fileListas[0]?.thumbUrl,
    applicant : this.applicantid,
    coapplicant : this.coapplicantid
  },
  {
    name: "coapplicant",
    base64:this.fileListco[0]?.thumbUrl,
    applicant : this.applicantid,
    coapplicant : this.coapplicantid
  },
  {
    name: "coapplicantsign",
    base64:this.fileListcos[0]?.thumbUrl,
    applicant : this.applicantid,
    coapplicant : this.coapplicantid
  },
]
console.log(obj);
if(obj){

  this.successService.ResponseMessage("success", "Image added");
  this.ngOnInit();
  obj=[];
}
else{
  
this.successService.ResponseMessage("error", "Please Upload image");
}
}
}
