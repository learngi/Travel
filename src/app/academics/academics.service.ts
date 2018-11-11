import { Injectable } from '@angular/core';

import { ApiService } from '../common/api.service';
import { AppSettings } from '../app.settings';
import {
  Headers,
  Http,
  RequestOptions,
  Response,
  ResponseContentType
} from '@angular/http';

@Injectable()
export class AcademicService {
  constructor(private _http: Http, private _apiService: ApiService) {}

  //   uploadImage() {
  //     const url = AppSettings.API.carouselUpload;
  //     return this._apiService.callApi(url, 'get', null);
  //   }

  getAllData() {
    const url = AppSettings.API.GET_ALL_DATA;
    return this._apiService.callApi(url, 'get', null);
  }

  getSubjects() {
    const url = AppSettings.API.GET_ALL_SUB_DATA ;
    return this._apiService.callApi(url, 'get', null);
  }

  academics(values: any) {
    const url = AppSettings.API.academicsUpload;
    return this._apiService.callApi(url, 'POST', values);
  }
  getUploadList(id) {
    const reg_no = id;
    const url = AppSettings.API.getUploadList + `/${reg_no}`;
    return this._apiService.callApi(url, 'get', null);
  }
  getFiles() {
    const url = AppSettings.API.GET_ALL_FILES;
    return this._apiService.callApi(url, 'get', null);
  }

  downloadAttachment(name) {
    // console.log('savers', id, name);
    // const url = AuditSettings.API.AUDIT_ATTACHMENT + `/${id}` + `/${name}`;
    // return this._auditapiService.callApi(url, 'get', null);
    return this._http.get(
      AppSettings.API.DOWNLOAD_ATTACHEMENT + `/${name}`,
      new RequestOptions({ responseType: ResponseContentType.Blob })
    );
  }
}
