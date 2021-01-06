import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CoApplicantService {

	private API_URL = environment.API_URL;
	constructor(private http: HttpClient) { }

	coapplicantCreate(value: any): Observable<any> {
		return this.http.post(`${this.API_URL}coapplicant`, {
			...value,
		}).pipe(first(), map((data: any) => data.data));
	};
}
