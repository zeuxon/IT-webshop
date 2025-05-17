import { Product } from './product.model';

export interface Order {
    id: string;
    userId: number;
    products: {
        product: Product;
        quantity: number;
    }[];
    ordered?: boolean;
}