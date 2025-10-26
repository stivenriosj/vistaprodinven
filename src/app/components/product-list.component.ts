import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductDto } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: '../view/product-list.component.html',
   imports: [CommonModule, RouterModule],
  styleUrls: ['../style/product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  items: ProductDto[] = [];
  loading = false;
  error: string | null = null;
  page = 0;
  size = 10;
  totalPages = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.load();
  }

  load(page = 0) {
    this.loading = true;
    this.error = null;
    this.productService.list(page, this.size).subscribe({
      next: res => {
        this.items = res.items;
        this.totalPages = res.meta?.totalPages ?? 0;
        this.page = page;
        this.loading = false;
      },
      error: err => {
        this.error = err?.message ?? 'Error al cargar productos';
        this.loading = false;
      }
    });
  }

  prev() { if (this.page > 0) this.load(this.page - 1); }
  next() { if (this.page + 1 < this.totalPages) this.load(this.page + 1); }
}
