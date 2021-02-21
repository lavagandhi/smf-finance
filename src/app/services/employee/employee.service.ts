import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  getallemployee(): Observable<any> {
    return this.http.get(`${this.API_URL}employee/all`).pipe(first(), map((data: any) => data.data));
  }

  employeeCreate(value: any): Observable<any> {
    return this.http.post(`${this.API_URL}employee`, {
      ...value,
    }).pipe(first(), map((data: any) => data.data));
  }
  editemployee(id): Observable<any> {
    return this.http.get(`${this.API_URL}employee/` + id).pipe(first(), map((data: any) => data.data));
  }

  deleteemployee(id): Observable<any> {
    return this.http.delete(`${this.API_URL}employee/` + id).pipe(first(), map((data: any) => data.data));
  }

  editemployeesave(id, value): Observable<any> {
    return this.http.put(`${this.API_URL}employee/` + id, {
      ...value,
    });
  }

  getfieldreport(data): Observable<any> {
    return this.http.post(`${this.API_URL}employee/fieldreport`, data).pipe(first(), map((data: any) => data.data));
  }

}
