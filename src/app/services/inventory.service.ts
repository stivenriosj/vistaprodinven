import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { InventoryResponse } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private base = environment.inventoryApiBase; 
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getQuantity(productId: number): Observable<number> {
    const headers = new HttpHeaders({ 'X-API-KEY': this.apiKey });
    return this.http.get<InventoryResponse>(`${this.base}/${productId}`, { headers })
      .pipe(map(resp => Number(resp.data.attributes.quantity)));
  }

  purchase(productId: number, qty: number): Observable<number> {
    const headers = new HttpHeaders({ 'X-API-KEY': this.apiKey });
  
    return this.http.post<InventoryResponse>(`${this.base}/${productId}/purchase?qty=${qty}`, null, { headers })
      .pipe(map(resp => Number(resp.data.attributes.quantity)));
  }
}