import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {


  title = 'Payment';
  btnName = 'Submit';
  constructor(private fb: FormBuilder, ) { }
  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
			centerid: [null, [Validators.required]],
			groupid: [null, [Validators.required]],     
    });
  }

  submitForm(form: FormGroup): void {
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsDirty();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
	}

	resetForm(e: MouseEvent): void {
		e.preventDefault();
		this.validateForm.reset();
		for (const key in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(key)) {
				this.validateForm.controls[key].markAsPristine();
				this.validateForm.controls[key].updateValueAndValidity();
			}
		}
	}

}
