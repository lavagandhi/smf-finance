import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {

  private API_URL= environment.API_URL;
constructor(private http:HttpClient) { }

bankCreate(value: any): Observable<any> {
  return this.http.post(`${this.API_URL}bank`, {
    ...value,
  }).pipe(first(), map((data: any) => data.data));
}
editbank(id): Observable<any> {
  return this.http.get(`${this.API_URL}bank/` + id).pipe(first(), map((data: any) => data.data));
}

editbanksave(id, value):Observable<any> {
  return this.http.put(`${this.API_URL}bank/` + id, {
    ...value,
  });
}

}
