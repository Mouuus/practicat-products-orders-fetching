import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerUrl = '/assets/users.json';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.customerUrl}?Id=${id}`);
  }
}
