import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(this.url + '/inventory_item/get');
  }

  addNewProduct(data: any): Observable<any> {
    return this.http.post(this.url + '/inventory_item/add', data);
  }

  updateProduct(data: any): Observable<any> {
    return this.http.post(this.url + '/inventory_item/update', data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.post(this.url + `/inventory_item/delete/${id}`, {});
  }

  getProductsByCategory(id: any): Observable<any> {
    return this.http.get(this.url + `/inventory_item/getByInventoryCategory/${id}`);
  }

  updateProductStatus(data: any): Observable<any> {
    return this.http.post(this.url + '/inventory_item/updatePARLevel', data);
  }
}
