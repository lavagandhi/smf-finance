import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }
  groupCreate(value: any): Observable<any> {
    return this.http.post(`${this.API_URL}group`, {
      ...value,
    }).pipe(first(), map((data: any) => data.data));;
  }
  getGroup(): Observable<any> {
    return this.http.get(`${this.API_URL}group/all`).pipe(first(), map((data: any) => data.data));;
  }

  getGroupByCenter(centerid:string): Observable<any> {
    return this.http.get(`${this.API_URL}group/bycenter/${centerid}`).pipe(first(), map((data: any) => data.data));;
  }

  deleteGroup(id): Observable<any> {
    return this.http.delete(`${this.API_URL}group/` + id).pipe(first(), map((data: any) => data.data));;
  }
  editgroup(id) {
    return this.http.get(`${this.API_URL}group/` + id).pipe(first(), map((data: any) => data.data));;
  }
  editsave(id, value) {
    return this.http.put(`${this.API_URL}group/` + id, {
      ...value,
    }).pipe(first(), map((data: any) => data.data));;
  }
}
