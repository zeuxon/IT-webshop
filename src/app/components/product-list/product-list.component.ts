import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
// import { DUMMY_CATEGORIES } from '../../models/dummy-categories';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { HighlightDirective } from '../../directives/highlight.directive';
import { ButtonActiveDirective } from '../../directives/button-active.directive';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.model';
import { StockStatusPipe } from '../../pipes/stockstatus.pipe';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, PriceFormatPipe, CategoryFilterComponent, HighlightDirective, ButtonActiveDirective, StockStatusPipe],
})
export class ProductListComponent {
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  lastLoadedProduct: Product | null = null;

  private selectedCategoryId: number = 0;
  private priceFilter: string = '';

  selectedCategoryName: string = '';

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    this.products = await this.productService.getAllProducts();
    this.filteredProducts = this.products;
    this.categories = await this.productService.getAllCategories();
  }


  async onCategorySelected(categoryName: string): Promise<void> {
  this.selectedCategoryName = categoryName;
  if (!categoryName || categoryName === 'all') {
    this.products = await this.productService.getAllProducts();
  } else {
    this.products = await this.productService.getProductsByCategory(categoryName);
  }
  this.applyFilters();
}

  async showTop5Expensive(): Promise<void> {
    this.products = await this.productService.getTop5ExpensiveProducts();
    this.filteredProducts = this.products;
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

    if (this.selectedCategoryName && this.selectedCategoryName !== 'all') {
    filteredByCategory = this.products.filter(product => {
      
      if (typeof product.category === 'string') {
        return product.category === this.selectedCategoryName;
      }

      if (product.category && typeof product.category === 'object' && 'name' in product.category) {
        return product.category.name === this.selectedCategoryName;
      }

      return false;
    });
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

  async filterByPriceRange(min: number, max: number): Promise<void> {
    this.products = await this.productService.getProductsInPriceRange(min, max);
    this.filteredProducts = this.products;
  }

  async showCheapestInStock(): Promise<void> {
    this.products = await this.productService.getCheapestInStockProducts();
    this.filteredProducts = this.products;
  }

  resetFilters(): void {
    this.selectedCategoryName = '';
    this.priceFilter = '';
    this.products = [];
    this.filteredProducts = [];
    this.ngOnInit();
  }
}