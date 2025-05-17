import { Category } from './category.model';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: Category;
    stock: number;
    imageUrl: string;
    description?: string;
}