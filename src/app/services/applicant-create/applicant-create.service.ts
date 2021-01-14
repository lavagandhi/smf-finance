import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class ApplicantCreateService {
	private API_URL = environment.API_URL;
	constructor(private http: HttpClient) { }

	applicantCreate(value: any): Observable<any> {
		return this.http.post(`${this.API_URL}applicant`, {
			...value,
		}).pipe(first(), map((data: any) => data.data));
	}

	getAllapplicant(): Observable<any> {
		return this.http.get(`${this.API_URL}applicant/all`).pipe(first(), map((data: any) => data.data));
	}

	deleteapplicant(id): Observable<any> {
		return this.http.delete(`${this.API_URL}applicant/` + id);
	}

	editApplicant(id): Observable<any> {
		return this.http.get(`${this.API_URL}applicant/byapplicant/` + id).pipe(first(), map((data: any) => data.data));
	}

	editsave(id, value): Observable<any> {
		return this.http.put(`${this.API_URL}applicant/` + id, {
			...value,
		});
	}

	getapplicantdetails(id): Observable<any> {
		return this.http.get(`${this.API_URL}applicant/applicantdetails/${id}`).pipe(first(), map((data: any) => data.data));
	}

	getallfulldetails(): Observable<any> {
		return this.http.get(`${this.API_URL}applicant/allfulldetails`).pipe(first(), map((data: any) => data.data));
	}

	exportData(exportname): Observable<any> {
		return this.http.get(`${this.API_URL}applicant/export/${exportname}`).pipe(first(), map((data: any) => data.data));
	}

	getapplicantbygroup(groupid: string): Observable<any> {
		return this.http.get(`${this.API_URL}applicant/groupapplicants/${groupid}`).pipe(first(), map((data: any) => data.data));
	}

	uploadimage(imagedata: any): Observable<any> {
		return this.http.post(`${this.API_URL}applicant/uploadimage`, imagedata).pipe(first(), map((data: any) => data.data));
	}
}
