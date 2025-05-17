import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private firestore: Firestore) {}

  async getAllProducts(): Promise<Product[]> {
    const productsCol = collection(this.firestore, 'products');
    const snapshot = await getDocs(productsCol);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Product));
  }

    async addProduct(product: Partial<Product>) {

    if (product.category) {
      const categoriesCol = collection(this.firestore, 'categories');
      const q = query(categoriesCol, where('name', '==', product.category));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        await addDoc(categoriesCol, { name: product.category });
      }
    }

    const productsCol = collection(this.firestore, 'products');
    await addDoc(productsCol, product);
  }

  async updateProduct(id: string, product: Partial<Product>) {
    const productRef = doc(this.firestore, 'products', id);
    await updateDoc(productRef, product);
  }

  async deleteProduct(id: string) {
    const productRef = doc(this.firestore, 'products', id);
    await deleteDoc(productRef);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const q = query(
      collection(this.firestore, 'products'),
      where('category', '==', category)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  }

  async getTop5ExpensiveProducts(): Promise<Product[]> {
    const q = query(
      collection(this.firestore, 'products'),
      orderBy('price', 'desc'),
      limit(5)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  }

  async getCheapestInStockProducts(): Promise<Product[]> {
    const q = query(
      collection(this.firestore, 'products'),
      where('stock', '>', 0),
      orderBy('price', 'asc'),
      limit(10)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  }

  async getProductsInPriceRange(min: number, max: number): Promise<Product[]> {
    const q = query(
      collection(this.firestore, 'products'),
      where('price', '>=', min),
      where('price', '<=', max)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  }



  async getAllCategories(): Promise<Category[]> {
    const categoriesCol = collection(this.firestore, 'categories');
    const snapshot = await getDocs(categoriesCol);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data()['name']
    }));
  }
}