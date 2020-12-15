import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
const apiUrl = `http://dev.armax.com:3001/api`;
@Injectable({
	providedIn: 'root',
})
export class EnumService {
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: this.token.gettoken(),
	});

	options = { headers: this.headers };

	constructor(private token: TokenService, private http: HttpClient) {}

	getEnumData(enumname): Observable<any> {
		return this.http.get(`${apiUrl}/dropdown/${enumname}`, this.options);
	}
}
