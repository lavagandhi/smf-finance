import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { first, map } from 'rxjs/operators';

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

  GrouppaymentCreate(groupid: string, value: any): Observable<any> {
    return this.http.put(`${this.API_URL}payment/grouppayment/${groupid}`, value);
  }

  getPayment(applicantid: string): Observable<any> {
    return this.http.get(`${this.API_URL}payment/getapplicantpayemnt/${applicantid}`).pipe(first(), map((data: any) => data.data));
  };
}
