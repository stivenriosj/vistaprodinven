import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { InventoryService } from '../services/inventory.service';
import { ProductDto } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: '../view/product-detail.component.html',
   imports: [CommonModule, RouterModule],
  styleUrls: ['../style/product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductDto | null = null;
  loading = false;
  error: string | null = null;
  inventoryLoading = false;
  inventoryError: string | null = null;
  quantityAvailable: number | null = null;

  purchaseQty = 1;
  purchaseLoading = false;
  purchaseError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
    this.loadInventory(id);
  }

  loadProduct(id: number) {
    this.loading = true;
    this.productService.getById(id).subscribe({
      next: p => { this.product = p; this.loading = false; },
      error: e => { this.error = e?.message ?? 'Error al cargar producto'; this.loading = false; }
    });
  }

  loadInventory(productId: number) {
    this.inventoryLoading = true;
    this.inventoryError = null;
    this.inventoryService.getQuantity(productId).subscribe({
      next: q => { this.quantityAvailable = q; this.inventoryLoading = false; },
      error: e => { this.inventoryError = e?.error?.errors?.[0]?.detail ?? e?.message ?? 'No hay inventario'; this.inventoryLoading = false; }
    });
  }

  purchase() {
    if (!this.product) return;
    this.purchaseLoading = true;
    this.purchaseError = null;
    this.inventoryService.purchase(this.product.id, this.purchaseQty).subscribe({
      next: newQty => {
        this.quantityAvailable = newQty;
        this.purchaseLoading = false;
      },
      error: e => {
        this.purchaseError = e?.error?.errors?.[0]?.detail ?? e?.message ?? 'Error en la compra';
        this.purchaseLoading = false;
      }
    });
  }
}
