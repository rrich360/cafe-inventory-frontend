import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockOrderService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  generateReport(data: any): Observable<any> {
    return this.http.post(this.url + '/stock_orders/generate_report', data);
  }

  getStockOrders(): Observable<any> {
    return this.http.get(this.url + '/stock_orders/getStockOrders');
  }

  getPdf(data: any): Observable<any> {
    return this.http.post(this.url + '/stock_orders/getPdf', data, {
      responseType: 'blob'
    });
  }

  deleteStockOrder(id: any): Observable<any> {
    return this.http.post(this.url + `/stock_orders/delete/${id}`, {});
  }
}
