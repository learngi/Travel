import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  Http,
  Headers,
  Response,
  RequestOptions,
  ResponseContentType
} from '@angular/http';

import { AppSettings } from '../app.settings';
import { map } from 'rxjs/operators';

// import 'rxjs/Rx';

@Injectable()
export class ApiService {
  headers = { headers: new Headers({ 'content-type': 'application/json' }) };
  options = new RequestOptions();

  constructor(private _http: Http) {}
  callApi(url, method, body = null): Observable<any> {
    if (sessionStorage.getItem('token')) {
      this.token1();
    }

    switch (method.toUpperCase()) {
      case 'LOGIN':
        return this._http
          .post(url, body, this.options)
          .pipe(map((response: Response) => response.json()));
      case 'POST':
        return this._http
          .post(url, body, this.options)
          .pipe(map((response: Response) => response.json()));

      case 'PATCH':
        return this._http
          .patch(url, body)
          .pipe(map((response: Response) => response.json()));

      case 'DELETE':
        return this._http
          .delete(url)
          .pipe(map((response: Response) => response.json()));

      case 'GET':
        return this._http
          .get(url)
          .pipe(map((response: Response) => response.json()));

      case 'FILE_UPLOAD':
        return this._http
          .post(url, body)
          .pipe(map((response: Response) => response.json()));
    }
  }
  // extraData(response: Response): Response {
  //     return response.json();
  // }
  token() {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'BEARER ' + sessionStorage.getItem('token')
      })
    });
  }
  token1() {
    return new RequestOptions({
      headers: new Headers({
        // 'Content-Type': 'application/json',
        Authorization: 'BEARER ' + sessionStorage.getItem('token')
      })
    });
  }
}
