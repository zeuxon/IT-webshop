import { Product } from './product.model';

export interface Order {
    id: number;
    userId: number;
    products: {
        product: Product;
        quantity: number;
    }[];
    ordered?: boolean;
}