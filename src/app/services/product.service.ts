import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { JsonApiResponse, ProductDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private base = environment.productApiBase; 
  constructor(private http: HttpClient) {}

  list(page = 0, size = 10): Observable<{ items: ProductDto[]; meta?: any }> {
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.get<JsonApiResponse<any[]>>(this.base, { params })
      .pipe(map(resp => {
        const data = resp.data as any[];
        const items = data.map(d => this.toDto(d));
        return { items, meta: (resp as any).meta };
      }));
  }

  getById(id: number): Observable<ProductDto> {
    return this.http.get<JsonApiResponse<any>>(`${this.base}/${id}`)
      .pipe(map(resp => this.toDto(resp.data as any)));
  }

  private toDto(d: any): ProductDto {
    const attrs = d.attributes || {};
    return {
      id: Number(d.id),
      name: attrs.name,
      description: attrs.description,
      price: attrs.price ? Number(attrs.price) : undefined
    };
  }
}
