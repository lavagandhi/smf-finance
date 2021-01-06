import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccessService } from 'src/app/services/success.service';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	validateForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private successService : SuccessService,
	) {}

	ngOnInit(): void {
		this.validateForm = this.fb.group({
			userName: [null, [Validators.required]],
			password: [null, [Validators.required]],
		});
	}

	submitForm(): void {
		for (const i in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(i)) {
				this.validateForm.controls[i].markAsDirty();
				this.validateForm.controls[i].updateValueAndValidity();
			}
		}
		if(this.validateForm.value.userName === "admin" && this.validateForm.value.password === "admin"){
			this.router.navigateByUrl('/dashboard');
			this.successService.ResponseMessage("success","Login Successfully....!!!!!")
		}
		else{
			this.successService.ResponseMessage("error","Enter valid username and password")
		}
	}
}
