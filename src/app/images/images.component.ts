import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from './image.service';
import { AppSettings } from '../app.settings';
import * as _ from 'underscore';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  constructor(
    private _imageService: ImageService,
    public toastr: ToastrManager
  ) {}
  image = '';
  status = '1';
  type = 'offers';
  imageList = [];
  disableList = [];
  totalImages = [];
  filterImages = [];
  showImages = true;
  image_path = AppSettings.imagePath;
  img_url = true;
  place_name = '';
  ngOnInit() {
    this.getImageList();
  }

  getImageList() {
    console.log('ff');
    this._imageService.getImages().subscribe(data => {
      if (data.success) {
        this.imageList = [];
        this.disableList = [];
        this.totalImages = [];
        data.data.forEach(item => {
          this.totalImages.push({
            id: item.id,
            path: item.image,
            status: item.status,
            name: item.image_name
          });
          if (item.status === 1) {
            this.imageList.push({
              id: item.id,
              path: item.image,
              status: item.status,
              name: item.image_name
            });
          } else {
            this.disableList.push({
              id: item.id,
              path: item.image,
              status: item.status,
              name: item.image_name
            });
          }
        });
        console.log('ff', this.imageList);
      }
    });
  }
  //   video upload
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      // const fileSize = Math.round(file.size / 1024);
      // const fileUpload = event.target.files[0];
      // const regex = new RegExp('([a-zA-Z0-9s_\\.-:])+(.jpg|.png|.gif)$');
      // if (regex.test(fileUpload.name.toLowerCase())) {
      //   // Check whether HTML5 is supported.
      //   if (typeof fileUpload.name !== 'undefined') {
      //     // Initiate the FileReader object.
      //     const reader = new FileReader();
      //     // Read the contents of Image File.
      //     reader.readAsDataURL(fileUpload);

      //     reader.onload = function(e) {
      //       // Initiate the JavaScript Image object.
      //       const images = new Image();

      //       // Set the Base64 string return from FileReader as source.
      //       images.src = e.target['result'];
      //       // console.log(image.src);

      //       // Validate the File Height and Width.
      //       images.onload = function() {
      //         // const height = height;
      //         // const width = width;
      //         console.log(images.height, images.width);

      //         if (images.height > 600 || images.width > 600) {
      //           document.getElementById('video')['value'] = '';
      //           alert('Height and Width must not exceed 600px.');
      //           return false;
      //         }
      //         return true;
      //       };
      //     };
      //   } else {
      //     alert('This browser does not support HTML5.');
      //     return false;
      //   }
      // } else {
      //   alert('Please select a valid Image file.');
      //   return false;
      // }
    }
  }
  private prepareSave(): any {
    const input = new FormData();
    // input.append('dt', date);
    input.append('image', this.image);
    input.append('status', this.status);
    input.append('type', this.type);
    input.append('place_name', this.place_name);
    // input.append('training_id', JSON.stringify(this.editId));
    // if (this.editId) {
    //   input.append('training_id', this.editId);
    // }
    return input;
  }

  saveNews() {
    const formModel = this.prepareSave();
    this._imageService.uploadImage(formModel).subscribe(data => {
      if (data.success) {
        this.toastr.successToastr('Success!');

        this.getImageList();
        this.showImages = true;
        console.log('ff');
      } else {
      }
    });
  }

  addimg() {
    this.showImages = false;
  }
  back() {
    this.showImages = true;
  }

  enable(id, status) {
    if (status === 1) {
      if (confirm('Do u want Enable this image!') === true) {
        const body = { id: id, status: status };
        this._imageService.enable(body).subscribe(data => {
          if (data.success) {
            this.getImageList();
          }
        });
      } else {
      }
    } else {
      if (confirm('Do u want Disable this image!') === true) {
        const body = { id: id, status: status };
        this._imageService.enable(body).subscribe(data => {
          if (data.success) {
            this.getImageList();
          }
        });
      } else {
      }
    }
  }

  viewImg(id) {
    this.filterImages = _.filter(this.totalImages, function(item) {
      return item.id === id;
    });
  }
}
