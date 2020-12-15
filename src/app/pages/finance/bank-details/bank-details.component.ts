import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder,) { }
  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
			typeofaccount: [null, [Validators.required]],
			name: [null, [Validators.required]],
			nameofthebank: [null, [Validators.required]],
			branch: [null, [Validators.required]],
      modeofoperation: [null, [Validators.required]],
      accountno: [null, [Validators.required]],
      ifsccode: [null, [Validators.required]],
      
		});
  }
  submitBankForm(form: FormGroup): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

}
