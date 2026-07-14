import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategorys(): Observable<any> {
    return this.http.get(this.url + '/inventory_category/get');
  }

  addNewCategory(data: any): Observable<any> {
    return this.http.post(this.url + '/inventory_category/add', data);
  }

  updateCategory(data: any): Observable<any> {
    return this.http.post(this.url + '/inventory_category/update', data);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.post(this.url + `/inventory_category/delete/${id}`, {});
  }
}
