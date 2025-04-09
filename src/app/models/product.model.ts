import { Category } from './category.model';

export interface Product {
    id: number;
    name: string;
    price: number;
    category: Category;
    stock: number;
    imageUrl: string;
    description?: string;
}