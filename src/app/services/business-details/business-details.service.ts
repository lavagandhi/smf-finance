import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessDetailsService {

  private API_URL= environment.API_URL;
constructor(private http:HttpClient) { }

	businessCreate(value: any): Observable<any> {
		return this.http.post(`${this.API_URL}business`, {
			...value,
		}).pipe(first(), map((data: any) => data.data));
	}
	editbusiness(id): Observable<any> {
		return this.http.get(`${this.API_URL}business/` + id).pipe(first(), map((data: any) => data.data));
	  }
	  
	  editbusinesssave(id, value):Observable<any> {
		return this.http.put(`${this.API_URL}business/` + id, {
		  ...value,
		});
	  }
}
