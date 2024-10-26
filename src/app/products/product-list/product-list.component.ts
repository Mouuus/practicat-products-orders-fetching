// src/app/products/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { productService } from 'src/app/services/productService/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  unsubscribe!: Subscription;
  constructor(private apiService: productService) {}

  ngOnInit(): void {
    this.unsubscribe = this.apiService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => {
        alert('An error occured while retreiving data');
      }
    );
  }

  isLowStock(quantity: number): boolean {
    return quantity <= 5;
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
