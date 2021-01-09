import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanProgressService {
  private API_URL= environment.API_URL;
constructor(private http:HttpClient) { }
loanCreate(value: any): Observable<any> {
  return this.http.post(`${this.API_URL}loan`, {
    ...value,
  }).pipe(first(), map((data: any) => data.data));
}
getLoan(): Observable<any> {
  return this.http.get(`${this.API_URL}loan/all`).pipe(first(), map((data: any) => data.data));
}
deleteLoan(id): Observable<any> {
  return this.http.delete(`${this.API_URL}loan/`+id).pipe(first(), map((data: any) => data.data));
}
editloan(id){
  return this.http.get(`${this.API_URL}loan/`+id).pipe(first(), map((data: any) => data.data));
}
editsave(id,value){
  return this.http.put(`${this.API_URL}loan/`+id ,{
    ...value,
  }).pipe(first(), map((data: any) => data.data));
}
}
