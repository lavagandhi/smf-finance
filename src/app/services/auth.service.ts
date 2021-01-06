import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { differenceInSeconds } from 'date-fns';
import { Observable } from 'rxjs';

import { Credentials } from './../data-models/credentials';
import { Credentialspassword } from './../data-models/changepassword';
import { TokenService } from './token.service';

const AUTH_API = 'http://dev.armax.com:3001/api/';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private tokenTimer: any;
	constructor(
		private readonly http: HttpClient,
		public jwtHelper: JwtHelperService,
		private readonly tokenService: TokenService
	) {
		this.setAuthTimer();
	}

	private setAuthTimer(): void {
		if (
			this.jwtHelper.getTokenExpirationDate() !== null &&
			this.jwtHelper.getTokenExpirationDate() !== undefined
		) {
			clearTimeout(this.tokenTimer);
			const tokendifference = differenceInSeconds(
				this.jwtHelper.getTokenExpirationDate(),
				new Date()
			);
			if (tokendifference > 10) {
				this.tokenTimer = setTimeout(() => {
					this.fetchrefreshtoken();
				}, tokendifference - 10);
				//  this.router.navigateByUrl('/user');
			} else if (tokendifference > 3 && tokendifference <= 10) {
				this.fetchrefreshtoken();
			} else {
				this.logout();
			}
		} else {
			this.logout();
		}
	}

	validatelogin(): void {
		this.setAuthTimer();
	}

	setlogin(accessToken, refreshToken): void {
		this.tokenService.savetoken(accessToken);
		this.tokenService.saverefreshtoken(refreshToken);
		this.setAuthTimer();
	}
	private fetchrefreshtoken = () => {
		this.refreshtokens({
			refreshtoken: this.tokenService.getrefreshtoken(),
		}).subscribe(
			(result: any) => {
				this.tokenService.savetoken(result.data.accessToken);
				this.tokenService.saverefreshtoken(result.data.refreshToken);
				clearTimeout(this.tokenTimer);
				this.setAuthTimer();
			},
			(error) => {
				this.logout();
			}
		);
	};

	logout(): void {
		clearTimeout(this.tokenTimer);
		//  this.tokenService.logout();
	}
	// login api call
	login(credentials: Credentials): Observable<any> {
		return this.http.post(
			`${AUTH_API}auth/signin`,
			{
				...credentials,
			},
			httpOptions
		);
	}

	// refresh token api call
	refreshtokens(refreshtoken: any): Observable<any> {
		return this.http.post(
			`${AUTH_API}auth/refreshtoken`,
			{
				...refreshtoken,
			},
			httpOptions
		);
	}

	// change password api call
	changepassword(credentialspassword: Credentialspassword): Observable<any> {
		return this.http.post(
			`${AUTH_API}auth/changepassword`,
			{
				...credentialspassword,
			},
			httpOptions
		);
	}
	// change active token  api call
	activate(activatetoken: string): Observable<any> {
		return this.http.put(
			`${AUTH_API}auth/activate/:activatetoken?activatetoken=` + activatetoken,
			httpOptions
		);
	}
	// forget password api call
	forgetpassword(forget: any): Observable<any> {
		return this.http.post(
			`${AUTH_API}auth/forgetpassword`,
			{
				...forget,
			},
			httpOptions
		);
	}
	isAuthorized(allowedRoles): boolean {
		// check if the list of allowed roles is empty, if empty, authorize the user to access the page
		if (allowedRoles == null || allowedRoles.length === 0) {
			return true;
		}
		// get token from local storage or state management
		const token = this.tokenService.gettoken();
		// decode token to read the payload details
		const decodeToken = this.jwtHelper.decodeToken(token);
		let allowed = true;
		if (decodeToken.roles && decodeToken.roles.length > 0) {
			for (const element of allowedRoles) {
				if (!decodeToken.roles.includes(element)) {
					allowed = false;
				} else {
					allowed = true;
				}
			}
		}
		return allowed;
	}
}
