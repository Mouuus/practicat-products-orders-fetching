import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.interface';
import { OrderService } from 'src/app/services/orderService/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  private unsubscribe?: Subscription;
  constructor(
    private apiService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orderId = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getOrder(orderId).subscribe((data: Order[]) => {
      this.order = data.find((obj) => obj.OrderId == orderId);
    });
  }

  ngOnDestroy() {
    this.unsubscribe?.unsubscribe();
  }
}
