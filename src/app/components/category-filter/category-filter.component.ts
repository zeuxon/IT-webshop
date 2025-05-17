import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
  imports: [CommonModule],
})
export class CategoryFilterComponent {
  @Input() categories: Category[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.categorySelected.emit(select.value);
  }
}