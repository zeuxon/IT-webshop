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
import { HighlightDirective } from '../../directives/highlight.directive';
import { ButtonActiveDirective } from '../../directives/button-active.directive';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, PriceFormatPipe, CategoryFilterComponent, HighlightDirective, ButtonActiveDirective],
})
export class ProductListComponent {
  products = DUMMY_PRODUCTS;
  categories = DUMMY_CATEGORIES;
  filteredProducts = this.products;

  private selectedCategoryId: number = 0;
  private priceFilter: string = '';

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  onCategorySelected(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
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
      this.snackBar.open('You must be logged in to add products to your order.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      this.router.navigate(['/login']);
    }
  }

  filterProducts(criteria: string): void {
    this.priceFilter = criteria;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filteredByCategory = this.products;

    if (this.selectedCategoryId !== 0) {
      filteredByCategory = this.products.filter(
        product => product.category.id === this.selectedCategoryId
      );
    }

    switch (this.priceFilter) {
      case 'inStock':
        this.filteredProducts = filteredByCategory.filter(product => product.stock > 0);
        break;
      case 'lowPrice':
        this.filteredProducts = filteredByCategory.filter(product => product.price < 100);
        break;
      case 'highPrice':
        this.filteredProducts = filteredByCategory.filter(product => product.price >= 100);
        break;
      default:
        this.filteredProducts = filteredByCategory;
        break;
    }
  }
}