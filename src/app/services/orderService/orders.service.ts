// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get('/assets/orders.json');
  }

  getOrder(orderId: number): Observable<any> {
    return this.http.get(`/assets/orders.json?OrderId=${orderId}`);
  }

  addOrder(order: any): Observable<any> {
    return this.http.post('/assets/orders.json', order);
  }
}
