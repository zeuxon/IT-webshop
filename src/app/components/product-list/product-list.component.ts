import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { DUMMY_PRODUCTS } from '../../models/dummy-products';
import { DUMMY_CATEGORIES } from '../../models/dummy-categories';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, PriceFormatPipe, CategoryFilterComponent],
})
export class ProductListComponent {
  products = DUMMY_PRODUCTS;
  categories = DUMMY_CATEGORIES;
  filteredProducts = this.products;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onCategorySelected(categoryId: number): void {
    this.filteredProducts = categoryId === 0
      ? this.products
      : this.products.filter(product => product.category.id === categoryId);
  }

  addToOrder(product: Product): void {
    if (this.userService.getLoggedInUser()) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Add to Order',
          message: `Are you sure you want to add "${product.name}" to your order?`,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.orderService.addToOrder(product);
        }
      });
    } else {
      alert('You must be logged in to add products to your order.');
      this.router.navigate(['/login']);
    }
  }

  filterProducts(criteria: string): void {
    switch (criteria) {
      case 'inStock':
        this.filteredProducts = this.products.filter(product => product.stock > 0);
        break;
      case 'lowPrice':
        this.filteredProducts = this.products.filter(product => product.price < 100);
        break;
      case 'highPrice':
        this.filteredProducts = this.products.filter(product => product.price >= 100);
        break;
      default:
        this.filteredProducts = this.products;
        break;
    }
  }
}