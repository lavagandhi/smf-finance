import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  uploading = false;
  fileList = [];
  constructor(private http: HttpClient, private msg: NzMessageService,
		private sanitizer: DomSanitizer) {}
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
