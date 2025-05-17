import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  product: Partial<Product> = {};
  editing: boolean = false;
  editingId: string | null = null;
  selectedFile: File | null = null;

  @ViewChild('nameInput') nameInputRef!: ElementRef<HTMLInputElement>;


  constructor(private productService: ProductService, private firestore: Firestore) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    if (this.nameInputRef) {
      this.nameInputRef.nativeElement.focus();
    }

  }

  async loadProducts() {
    this.products = await this.productService.getAllProducts();
  }

  async onSubmit() {
    let imageUrl = this.product.imageUrl || '';
    //   const userId = 'public'; // or any string you want as folder

    // if (this.selectedFile) {
    //   imageUrl = await this.supabaseService.uploadImage(this.selectedFile, this.selectedFile.name, userId);
    // }
    if (this.editing && this.editingId) {
      await this.productService.updateProduct(this.editingId, { ...this.product, imageUrl });
    } else {
      await this.productService.addProduct({ ...this.product, imageUrl });
    }
    this.cancelEdit();
    this.loadProducts();
    this.selectedFile = null;
  }

  editProduct(p: Product) {
    this.product = { ...p };
    this.editing = true;
    this.editingId = p.id;
  }

  cancelEdit() {
    this.product = {};
    this.editing = false;
    this.editingId = null;
  }

  async deleteProduct(id: string) {
    await this.productService.deleteProduct(id);
    this.loadProducts();
  }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

}