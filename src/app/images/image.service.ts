import { Injectable } from '@angular/core';

import { ApiService } from '../common/api.service';
import { AppSettings } from '../app.settings';

@Injectable()
export class ImageService {
  constructor(private _apiService: ApiService) {}

  //   uploadImage() {
  //     const url = AppSettings.API.carouselUpload;
  //     return this._apiService.callApi(url, 'get', null);
  //   }

  getImages() {
    const url = AppSettings.API.GET_IMAGES;
    return this._apiService.callApi(url, 'get', null);
  }

  uploadImage(values: any) {
    const url = AppSettings.API.carouselUpload;
    return this._apiService.callApi(url, 'FILE_UPLOAD', values);
  }

  enable(values: any) {
    const body = JSON.stringify(values);
    const url = AppSettings.API.IMAGE_STATUS;
    return this._apiService.callApi(url, 'post', body);
  }

  //   getNews() {
  //     const url = AppSettings.API.GET_NEWS;
  //     return this._apiService.callApi(url, 'get', null);
  //   }

  //   editTraining(id) {
  //     const url = AppSettings.API.TRAINING + `/${id}`;
  //     return this._apiService.callApi(url, 'get', null);
  //   }

  //   deleteManager(id) {
  //     const url = AuditSettings.API.DELETE_AUIDT + `/${id}`;
  //     return this._auditapiService.callApi(url, 'delete', null);
  //   }
}
