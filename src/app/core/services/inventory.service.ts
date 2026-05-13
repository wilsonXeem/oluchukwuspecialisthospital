import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private endpoint = '/inventory';

  constructor(private api: ApiService) {}

  getInventoryItems(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/items`, params);
  }

  createInventoryItem(item: any): Observable<any> {
    return this.api.post(`${this.endpoint}/items`, item);
  }

  updateInventoryItem(id: string, item: any): Observable<any> {
    return this.api.put(`${this.endpoint}/items/${id}`, item);
  }

  deleteInventoryItem(id: string): Observable<any> {
    return this.api.delete(`${this.endpoint}/items/${id}`);
  }

  getBatches(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/batches`, params);
  }

  createBatch(batch: any): Observable<any> {
    return this.api.post(`${this.endpoint}/batches`, batch);
  }

  updateBatch(id: string, batch: any): Observable<any> {
    return this.api.put(`${this.endpoint}/batches/${id}`, batch);
  }

  getExpiringItems(days?: number): Observable<any> {
    return this.api.get(`${this.endpoint}/expiring`, days ? { days } : {});
  }

  getLowStockItems(): Observable<any> {
    return this.api.get(`${this.endpoint}/low-stock`);
  }

  getInventoryReports(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/reports`, params);
  }

  adjustStock(id: string, adjustment: any): Observable<any> {
    return this.api.post(`${this.endpoint}/items/${id}/adjust`, adjustment);
  }

  transferStock(data: any): Observable<any> {
    return this.api.post(`${this.endpoint}/transfer`, data);
  }

  disposeBatch(id: string, reason: string): Observable<any> {
    return this.api.post(`${this.endpoint}/batches/${id}/dispose`, { reason });
  }

  generatePurchaseOrder(items: any[]): Observable<any> {
    return this.api.post(`${this.endpoint}/purchase-order`, { items });
  }

  getStockMovements(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/stock-movements`, params);
  }

  getInventoryValue(): Observable<any> {
    return this.api.get(`${this.endpoint}/value`);
  }

  exportInventory(format: string = 'csv'): Observable<any> {
    return this.api.get(`${this.endpoint}/export`, { format });
  }

  // Additional methods for complete functionality
  getItemById(id: string): Observable<any> {
    return this.api.get(`${this.endpoint}/items/${id}`);
  }

  getBatchById(id: string): Observable<any> {
    return this.api.get(`${this.endpoint}/batches/${id}`);
  }

  getItemBatches(itemId: string): Observable<any> {
    return this.api.get(`${this.endpoint}/items/${itemId}/batches`);
  }

  searchItems(query: string): Observable<any> {
    return this.api.get(`${this.endpoint}/items/search`, { q: query });
  }

  getCategories(): Observable<any> {
    return this.api.get(`${this.endpoint}/categories`);
  }

  getSuppliers(): Observable<any> {
    return this.api.get(`${this.endpoint}/suppliers`);
  }

  createPurchaseOrder(items: any[]): Observable<any> {
    return this.api.post(`${this.endpoint}/purchase-orders`, { items });
  }

  getPurchaseOrders(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/purchase-orders`, params);
  }

  receivePurchaseOrder(orderId: string, items: any[]): Observable<any> {
    return this.api.post(`${this.endpoint}/purchase-orders/${orderId}/receive`, { items });
  }

  getStockHistory(itemId: string, params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/items/${itemId}/history`, params);
  }

  performStockTake(items: any[]): Observable<any> {
    return this.api.post(`${this.endpoint}/stock-take`, { items });
  }

  getStockTakeHistory(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/stock-take/history`, params);
  }
}