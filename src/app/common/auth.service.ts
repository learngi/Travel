import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AppSettings } from '../app.settings';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  public userLoggedIn = false;

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private _apiService: ApiService) {}

  // login api
  login(body) {
    return this.http
      .post(AppSettings.API.LOGIN, JSON.stringify(body), this.options)
      .pipe(
        map((response: Response) => {
          const data = response.json();
          console.log('dffdfd', data, data.data.name);
          if (!data.error) {
            if (data && data.token) {
              sessionStorage.setItem('token', data.token);
              sessionStorage.setItem('name', data.data.name);
              sessionStorage.setItem('email', data.data.email);
              sessionStorage.setItem('role', data.data.role);
            }
          }
          return data;
        })
      );
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  token() {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'BEARER ' + sessionStorage.getItem('token')
      })
    });
  }
}
