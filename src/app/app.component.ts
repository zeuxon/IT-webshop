import { Component } from '@angular/core';
import { Category } from './models/category.model';
import { Product } from './models/product.model';
import { Order } from './models/order.model';
import { CommonModule } from '@angular/common';
import { OrderService } from './services/order.service';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserService } from './services/user.service';
import { OrderComponent } from './components/order/order.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
// import { DUMMY_CATEGORIES } from './models/dummy-categories';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { ProductService } from './services/product.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IT-webshop';

  categories: Category[] = [];

  orders: Order[] = [];

  isAdminUser = false;
  private firebaseAuth = inject(Auth);

  constructor(private orderService: OrderService, public userService: UserService, private productService: ProductService) {
    this.orders = this.orderService.getOrders();

    onAuthStateChanged(this.firebaseAuth, () => {
      this.checkAdminStatus();
    });
  }

  addToOrder(product: Product): void {
    if (this.userService.getLoggedInUser()) {
      this.orderService.addToOrder(product);
    } else {
      alert('You must be logged in to add products to your order.');
    }
  }

  checkAdminStatus() {
    this.userService.isAdmin().then(isAdmin => {
      this.isAdminUser = isAdmin;
      console.log('Is admin:', isAdmin);
    });
  }
  
}