import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder,) { }
  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
			loanaccountno: [null, [Validators.required]],
			goldloanbranch: [null, [Validators.required]],
			micropinbranch: [null, [Validators.required]],
			existingcenter: [null, [Validators.required]],
			centergroup: [null, [Validators.required]],
			existinggroup: [null, [Validators.required]],
			centeraddress: [null, [Validators.required]],
			name: [null, [Validators.required]],
			education: [null, [Validators.required]],
			marriagedetails: [null, [Validators.required]],
			husbandfathername: [null, [Validators.required]],
			religion: [null, [Validators.required]],
			caste: [null, [Validators.required]],
			phoneno: [null, [Validators.required]],
			telephone: [null, [Validators.required]],
			presentaddress: [null, [Validators.required]],
			permanentaddress: [null, [Validators.required]],
			statepresent: [null, [Validators.required]],
			statepermanent: [null, [Validators.required]],
			pincodepresent: [null, [Validators.required]],
			pincodepermanent: [null, [Validators.required]],
			noofyearstay: [null, [Validators.required]],
			housestatus: [null, [Validators.required]],
			primaryid: [null, [Validators.required]],
			primaryidnumber: [null, [Validators.required]],
			secondaryid: [null, [Validators.required]],
			secondaryidnumber: [null, [Validators.required]],
		});
  }

  submitApplicantForm(form: FormGroup): void {
	for (const key in this.validateForm.controls) {
		if (this.validateForm.controls.hasOwnProperty(key)) {
			this.validateForm.controls[key].markAsDirty();
			this.validateForm.controls[key].updateValueAndValidity();
		}
	}
}

}
