import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }
  centerCreate(value: any): Observable<any> {
    return this.http.post(`${this.API_URL}center`, {
      ...value,
    });
  }
  getCenter(): Observable<any> {
    return this.http.get(`${this.API_URL}center/all`).pipe(first(), map((data: any) => data.data));
  }
  deletecenter(id): Observable<any> {
    return this.http.delete(`${this.API_URL}center/` + id).pipe(first(), map((data: any) => data.data));
  }
  editCenter(id) {
    return this.http.get(`${this.API_URL}center/` + id).pipe(first(), map((data: any) => data.data));
  }
  editsave(id, value) {
    return this.http.put(`${this.API_URL}center/` + id, {
      ...value,
    }).pipe(first(), map((data: any) => data.data));
  }
}
