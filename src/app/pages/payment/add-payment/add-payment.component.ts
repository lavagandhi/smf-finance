import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Person {
	id: string;
	loanaccountno: string;
	goldloanbranch: string;
	micropinbranch: string;
	existingcenter: string;
	centergroup: string;
	existinggroup: string;
	centeraddress: string;
  }
@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

	isVisible = false;

	listOfData: Person[] = [
		{
		  id: '1',
		  loanaccountno: 'John Brown',
		  goldloanbranch: 'New York',
		  micropinbranch: 'New York',
		  existingcenter: 'New York',
		  centergroup: 'New York',
		  existinggroup: 'New York',
		  centeraddress: 'New York',
		},
		{
		  id: '2',
		  loanaccountno: 'Jim Green',
		  goldloanbranch: 'London',
		  micropinbranch: 'London',
		  existingcenter: 'London',
		  centergroup: 'London',
		  existinggroup: 'London',
		  centeraddress: 'London',
		},
		{
		  id: '3',
		  loanaccountno: 'Joe Black',
		  goldloanbranch: 'Sidney',
		  micropinbranch: 'Sidney',
		  existingcenter: 'Sidney',
		  centergroup: 'Sidney',
		  existinggroup: 'Sidney',
		  centeraddress: 'Sidney',
		},
	  ];

  title = 'Payment';
  btnName = 'Submit';

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


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
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
