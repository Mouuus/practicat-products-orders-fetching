import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/orderService/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  private unsubscribe!: Subscription;
  constructor(private apiService: OrderService) {}

  ngOnInit(): void {
    this.unsubscribe=
    this.apiService.getOrders().subscribe((data: any) => {
      this.orders = data;
    });
  }

  calculateTotal(order: any): number {
    return order.Products.reduce(
      (sum: number, product: any) =>
        sum + product.Quantity * product.ProductPrice,
      0
    );
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe()
  }
}
