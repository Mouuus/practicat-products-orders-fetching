import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class productService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get('/assets/porducts.json');
  }

  updateProductQuantity(
    products: any[],
    id: number,
    newQuantity: number
  ): Observable<any[]> {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.quantity = newQuantity;
    }
    return of(products);
  }

 
}
