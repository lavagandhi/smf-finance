import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-loan-process',
  templateUrl: './add-edit-loan-process.component.html',
  styleUrls: ['./add-edit-loan-process.component.scss']
})
export class AddEditLoanProcessComponent implements OnInit {

  title = 'Add New';
  btnName = 'Submit';
  constructor(private fb: FormBuilder, 	private activatedRoute: ActivatedRoute, private router: Router,) { }
  validateForm: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
			loangetlocation: [null, [Validators.required]],
			loangetreason: [null, [Validators.required]],       
			amount: [null, [Validators.required]],       
			installment: [null, [Validators.required]],       
			duration: [null, [Validators.required]],       
			paymentinstallment: [null, [Validators.required]],       
			requestedloanamount: [null, [Validators.required]],       
			purpose: [null, [Validators.required]],       
			repaymentrequested: [null, [Validators.required]],       
			perannuminterest: [null, [Validators.required]],       
			processingfee: [null, [Validators.required]],       
			insurance: [null, [Validators.required]],       
			groupid: [null, [Validators.required]],       
			paidedasal: [null, [Validators.required]],       
			pendinginstallment: [null, [Validators.required]],       
			remainasal: [null, [Validators.required]],       
			remaininterest: [null, [Validators.required]],       
			remaininsurance: [null, [Validators.required]],       
			installmonthly: [null, [Validators.required]],            
    });
    

      this.activatedRoute.params.subscribe((params) => {
        if(params.id){
        this.title = 'Edit';
        this.btnName = 'Update';
        this.validateForm.patchValue({
          loangetlocation: 'loan field',
          loangetreason: 'loan field',       
          amount: 'loan field',       
          installment: 'loan field',       
          duration: 'loan field',       
          paymentinstallment: 'loan field',       
          requestedloanamount: 'loan field',       
          purpose: 'loan field',       
          repaymentrequested: 'loan field',       
          perannuminterest: 'loan field',       
          processingfee: 'loan field',       
          insurance: 'loan field',       
          groupid: 'loan field',       
          paidedasal: 'loan field',       
          pendinginstallment: 'loan field',       
          remainasal: 'loan field',       
          remaininterest: 'loan field',       
          remaininsurance: 'loan field',       
          installmonthly: 'loan field',            
          
        });
      }
    })
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
