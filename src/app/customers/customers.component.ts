import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customerService/customers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  private unsubscribe!: Subscription;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.unsubscribe = this.customerService
      .getCustomers()
      .subscribe((data: any) => {
        this.customers = data;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
