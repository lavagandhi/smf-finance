import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  });
}

}
