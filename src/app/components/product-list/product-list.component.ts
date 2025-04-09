import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000, category: { id: 1, name: 'Electronics' }, stock: 10, imageUrl: 'laptop.jpg', description: 'A high-performance laptop' },
    { id: 2, name: 'Mouse', price: 20, category: { id: 2, name: 'Accessories' }, stock: 50, imageUrl: 'mouse.jpg', description: 'A wireless mouse' }
  ];

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router
  ) {}

  addToOrder(product: Product): void {
    if (this.userService.getLoggedInUser()) {
      this.orderService.addToOrder(product);
    } else {
      alert('You must be logged in to add products to your order.');
      this.router.navigate(['/login']);
    }
  }
}