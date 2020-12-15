import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder,) { }
  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
			natureofbusiness: [null, [Validators.required]],
			yearofexperience: [null, [Validators.required]],
			distanceresidence: [null, [Validators.required]],
			address: [null, [Validators.required]],
		});

}

submitBusinessForm(form: FormGroup): void {
	for (const key in this.validateForm.controls) {
		if (this.validateForm.controls.hasOwnProperty(key)) {
			this.validateForm.controls[key].markAsDirty();
			this.validateForm.controls[key].updateValueAndValidity();
		}
	}
}
}
