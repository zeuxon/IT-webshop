import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    {
      id: 1,
      userId: 123,
      products: []
    }
  ];

  getOrders(): Order[] {
    return this.orders;
  }

  addToOrder(product: Product): void {
    const order = this.orders[0];
    const existingItem = order.products.find(item => item.product.id === product.id);

    if (existingItem) {

      existingItem.quantity++;
    } else {

      order.products.push({ product, quantity: 1 });
    }
  }
}