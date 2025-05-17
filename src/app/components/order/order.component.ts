import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, PriceFormatPipe],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
  }

  deleteProduct(orderId: string, productId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.products = order.products.filter(item => item.product.id !== productId);
    }
  }

  increaseQuantity(orderId: string, productId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      const product = order.products.find(item => item.product.id === productId);
      if (product) {
        product.quantity++;
      }
    }
  }

  decreaseQuantity(orderId: string, productId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      const product = order.products.find(item => item.product.id === productId);
      if (product && product.quantity > 1) {
        product.quantity--;
      }
    }
  }
}