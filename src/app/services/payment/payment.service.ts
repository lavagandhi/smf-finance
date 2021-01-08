import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }
  paymentCreate(value: any): Observable<any> {
    return this.http.post(`${this.API_URL}payment`, {
      ...value,
    });
  }
}
