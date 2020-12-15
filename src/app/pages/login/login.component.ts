import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
		// private authservice: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.validateForm = this.fb.group({
			userName: [null, [Validators.required]],
			password: [null, [Validators.required]],
			remember: [true],
		});
	}

	submitForm(): void {
		for (const i in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(i)) {
				this.validateForm.controls[i].markAsDirty();
				this.validateForm.controls[i].updateValueAndValidity();
			}
		}

		// this.authservice
		// 	.login({
		// 		useremail: this.validateForm.value.userName,
		// 		password: this.validateForm.value.password,
		// 	})
		// 	.subscribe(
		// 		(x) => {
		// 			if (x.data.accessToken !== '') {
		// 				this.router.navigateByUrl('/dashboard');
		// 				this.authservice.setlogin(x.data.accessToken, x.data.refreshToken);
		// 			}
		// 		},
		// 		(error) => {}
		// 	);
	}
}
