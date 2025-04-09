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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent, OrderComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IT-webshop';

  // Mock data
  categories: Category[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Accessories' }
  ];

  products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000, category: this.categories[0], stock: 10, imageUrl: 'laptop.jpg', description: 'A high-performance laptop' },
    { id: 2, name: 'Mouse', price: 20, category: this.categories[1], stock: 50, imageUrl: 'mouse.jpg', description: 'A wireless mouse' }
  ];

  orders: Order[] = [];

  constructor(private orderService: OrderService, private userService: UserService) {
    this.orders = this.orderService.getOrders();
  }

  addToOrder(product: Product): void {
    if (this.userService.getLoggedInUser()) {
      this.orderService.addToOrder(product);
    } else {
      alert('You must be logged in to add products to your order.');
    }
  }
  
}