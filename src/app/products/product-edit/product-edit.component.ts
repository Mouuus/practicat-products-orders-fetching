import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { productService } from 'src/app/services/productService/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  product: any;
  products: any[] = [];

  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: productService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      quantity: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response;
    });
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProducts().subscribe((products: any[]) => {
      this.product = products.find((p) => p.ProductId === productId);
      if (this.product) {
        this.editForm.get('quantity')?.patchValue(this.product.AvailablePieces);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedQuantity = this.editForm.get('quantity')?.value;
      this.productService
        .updateProductQuantity(
          this.products,
          this.product.ProductId,
          updatedQuantity
        )
        .subscribe((response: any) => {
          alert('Product quantity updated successfully!');
          this.router.navigate(['/products']);
        });
    }
  }
}
