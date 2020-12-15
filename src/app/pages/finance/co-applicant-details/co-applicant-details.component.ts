import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
@Component({
  selector: 'app-co-applicant-details',
  templateUrl: './co-applicant-details.component.html',
  styleUrls: ['./co-applicant-details.component.scss']
})
export class CoApplicantDetailsComponent implements OnInit {

 
  constructor(private fb: FormBuilder,) { }
  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
			name: [null, [Validators.required]],
			gender: [null, [Validators.required]],
			relationship: [null, [Validators.required]],
		});
  }

  submitCoApplicantForm(form: FormGroup): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

}
