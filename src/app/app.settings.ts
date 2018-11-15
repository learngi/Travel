import { environment } from '../environments/environment';
export class AppSettings {
  public static API = {
    LOGIN: environment.apiUrl + 'auth',
    GET_TAGS: environment.apiUrl + 'getTags',
    GET_CATEGORY: environment.apiUrl + 'getCategory',
    NEWS: environment.apiUrl + 'insertNews',
    GET_NEWS: environment.apiUrl + 'news',
    carouselUpload: environment.apiUrl + 'carouselUpload',
    GET_IMAGES: environment.apiUrl + 'carousel/all',
    IMAGE_STATUS: environment.apiUrl + 'editCarousel',
    GET_ALL_DATA: environment.apiUrl + 'getAllData',
    academicsUpload: environment.apiUrl + 'uploadDocuments',
    GET_ALL_SUB_DATA: environment.apiUrl + 'tourPlaces',
    GET_COLLEGES: environment.apiUrl + 'getAllColleges',
    GET_ANNOUNCEMENT: environment.apiUrl + 'announcement',
    READ_MESSAGE: environment.apiUrl + 'readMessage',
    getUploadList: environment.apiUrl + 'getUploadList',
    DOWNLOAD_ATTACHEMENT: environment.apiUrl + 'documents',
    GET_ALL_FILES: environment.apiUrl + 'files',


    // new api's
    GET_ALL_ACADAMICS_LIST: environment.apiUrl + 'get/acadamics/list',
    GET_ACADAMICS_DETAILS: environment.apiUrl + 'get/acadamics/list/details'
  };
  public static imagePath = environment.apiUrl + 'image/';
}
