import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const PAYLOAD_KEY = 'vGQkALqwd6LCKqV3UwEB9DtTwQ8P882x';
const ALG_KEY = 'wR9tGPMdUf2u7VaQtgYYpVeFVd3Ka48q';
const HASH_KEY = 'TeygTpQCQ2V2Qh9hz998hKD7yYBSPt5W';

const REFRESH_PAYLOAD_KEY = '2QrQuc9M66tLbqLCFmKK67BSCkQTrWen';
const REFRESH_ALG_KEY = '5SgBWEPsa8bHtwxhqd5F92t9pBkv8xQT';
const REFRESH_HASH_KEY = 'M8ky4B4X7ChuSpKf3bzPJYD8LX9vVzA9';

const accesstokenkeys = ['PAYLOAD_KEY', 'ALG_KEY', 'HASH_KEY'];
const refreshtokenkeys = [
	'REFRESH_PAYLOAD_KEY',
	'REFRESH_ALG_KEY',
	'REFRESH_HASH_KEY',
];
const storagekeys = [...accesstokenkeys, ...refreshtokenkeys];

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	constructor(private router: Router) {}

	clearaccesstokens = (): void => {
		accesstokenkeys.forEach((element) => {
			window.sessionStorage.removeItem(element);
		});
	};
	clearrefreshtokens = (): void => {
		refreshtokenkeys.forEach((element) => {
			window.sessionStorage.removeItem(element);
		});
	};
	cleartokens = (): void => {
		storagekeys.forEach((element) => {
			window.sessionStorage.removeItem(element);
		});
	};

	savetoken = (accesstoken: string): void => {
		this.clearaccesstokens();
		const tokens = accesstoken.split('.');
		window.sessionStorage.setItem(ALG_KEY, tokens[0]);
		window.sessionStorage.setItem(PAYLOAD_KEY, tokens[1]);
		window.sessionStorage.setItem(HASH_KEY, tokens[2]);
	};

	saverefreshtoken = (refreshtoken: string): void => {
		this.clearrefreshtokens();
		const tokens = refreshtoken.split('.');
		window.sessionStorage.setItem(REFRESH_ALG_KEY, tokens[0]);
		window.sessionStorage.setItem(REFRESH_PAYLOAD_KEY, tokens[1]);
		window.sessionStorage.setItem(REFRESH_HASH_KEY, tokens[2]);
	};

	gettoken = (): string => {
		const alg = sessionStorage.getItem(ALG_KEY);
		const payload = sessionStorage.getItem(PAYLOAD_KEY);
		const hash = sessionStorage.getItem(HASH_KEY);
		if (alg && payload && hash) {
			return `${alg}.${payload}.${hash}`;
		}
		return '';
	};

	logout(): void {
		sessionStorage.clear();
		this.clearaccesstokens();
		this.clearrefreshtokens();
		this.cleartokens();
		this.router.navigateByUrl('/auth/login');
	}
	getrefreshtoken = (): string =>
		`${sessionStorage.getItem(REFRESH_ALG_KEY)}.${sessionStorage.getItem(
			REFRESH_PAYLOAD_KEY
		)}.${sessionStorage.getItem(REFRESH_HASH_KEY)}`;

	getuser = (): any => sessionStorage.getItem(PAYLOAD_KEY);
}
