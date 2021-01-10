import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { IncomeService } from 'src/app/services/income/income.service';
import { SuccessService } from 'src/app/services/success.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-income-details',
  templateUrl: './income-details.component.html',
  styleUrls: ['./income-details.component.scss']
})
export class IncomeDetailsComponent implements OnInit {
  id:any;
  dropdownValue:any;
	@Output() parentdata: EventEmitter<boolean> = new EventEmitter<boolean>();
  applicantid: any;
  constructor(private fb: FormBuilder,
    private incomeService:IncomeService,
    private successService :SuccessService,
    private activatedRoute :ActivatedRoute,
    private dropdownService :DropdownService,
    private tokenservice: TokenService,) {
      
    if(this.activatedRoute.snapshot.paramMap.get('id') !=null || this.activatedRoute.snapshot.paramMap.get('id') !=undefined){
				this.applicantid=this.activatedRoute.snapshot.paramMap.get('id')
			}
			else if(this.tokenservice.getstep('applicant') !=null || this.tokenservice.getstep('applicant') !=undefined){
				this.applicantid = this.tokenservice.getstep('applicant');
			}
     }
  validateForm: FormGroup;

  ngOnInit() {
    this.id = sessionStorage.getItem("id");
    this.validateForm = this.fb.group({
			nooffamilymember: [null, [Validators.required]],
			approximateyear: [null, [Validators.required]],
		});
    this.dropdownService.getEducation()
		.subscribe(data => {
			this.dropdownValue = data;
		});
    this.validateForm.valueChanges.subscribe(() => {
			if (this.validateForm.valid) {
				this.parentdata.emit(false);
			}
		  });
  }

  submitIncomeForm() {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    if (this.validateForm.valid) {
    this.incomeService.incomeCreate(this.validateForm.value,this.id).subscribe(data => {
      if(data){
        this.successService.ResponseMessage("success","Income details added");
      }
       
    })
  }
}

}
