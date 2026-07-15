import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(this.url + '/user/api/register', data);
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(this.url + '/user/api/forgot_password', data);
  }

  userSignIn(obj: any): Observable<any> {
    return this.http.post(this.url + '/user/api/sign_in', obj, {
      responseType: 'text'
    });
  }

  checkToken(): Observable<any> {
    return this.http.get(this.url + '/user/checkToken');
  }

  changePassword(data: any): Observable<any> {
    return this.http.patch(this.url + '/user', data);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url + '/user/get');
  }

  updateStatus(data: any): Observable<any> {
    return this.http.post(this.url + '/user/update', data);
  }
}
