import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
@Component({
  selector: 'app-income-details',
  templateUrl: './income-details.component.html',
  styleUrls: ['./income-details.component.scss']
})
export class IncomeDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder,) { }
  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
			nooffamilymember: [null, [Validators.required]],
			approximateyear: [null, [Validators.required]],
		});
  }

  submitIncomeForm(form: FormGroup): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

}
