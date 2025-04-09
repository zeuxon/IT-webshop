import { Component, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderComponent {
  @Input() orders: Order[] = [];
}