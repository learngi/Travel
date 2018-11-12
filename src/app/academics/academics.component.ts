import { Component, OnInit } from '@angular/core';
import { AcademicService } from './academics.service';
import {
  FormArray,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _ from 'underscore';
import { saveAs } from 'file-saver/FileSaver';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.css']
})
export class AcademicsComponent implements OnInit {
  constructor(
    private _academicService: AcademicService,
    private _fb: FormBuilder,
    public toastr: ToastrManager
  ) {}
  academicForm: FormGroup;
  showAcademics = true;
  subjectList = [];
  filterData = [];
  myFiles: string[] = [];
  reg_no = sessionStorage.getItem('reg_no');
  c_id = '';
  uploadfiles = [];
  showuploadfiles = [];
  message = '';
  ngOnInit() {
    this.getSubjectsList();
    this.academicForm = this._fb.group({
      c_id: ['0', Validators.required],
      avalibility: [''],
      amount: [''],
      dt: [''],
      no_of_days: [''],
      depature: [''],
      depature_time: [''],
      return_time: [''],
      uploadFiles: this._fb.array([this.initAddress()])
    });
  }
  initAddress() {
    return this._fb.group({
      id: [''],
      day: [''],
      title: ['', Validators.required],
      documents: ['', Validators.required],
      collapse: ['0'],
    });
  }

  addAddress() {
    const control = <FormArray>this.academicForm.controls['uploadFiles'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    const control = <FormArray>this.academicForm.controls['uploadFiles'];
    control.removeAt(i);
  }

  // getupload files
  getFileList() {
    this._academicService.getUploadList(this.reg_no).subscribe(data => {
      if (data.success) {
        this.uploadfiles = data.data;
        console.log('dataus', data.data);
      }
    });
  }
  // for faculties
  getSubjectsList() {
    console.log('her');
    this._academicService.getSubjects().subscribe(data => {
      if (data.success) {
        this.subjectList = data.data;
        this.getFileList();
      }
    });
  }

  onFileChange(event, i) {
    console.log('f');
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      (<FormArray>this.academicForm.controls.uploadFiles).controls[i]
        .get('documents')
        .setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
    const files = [];
    const arr = this.academicForm.get('uploadFiles').value;
    let i = 0;
    arr.forEach(element => {
      files.push({
        day: element.day,
        title: element.title,
        id: element.id,
      });
      if (element.documents) {
        input.append(`fileUpload${i}`, element.documents);
      }
      ++i;
    });

    input.append('uploadDocuments', JSON.stringify(files));
    input.append('academicForm', JSON.stringify(this.academicForm.value));
    return input;
  }

  // save academics
  saveNews() {
    const formModel = this.prepareSave();

    console.log( this.academicForm.value);

    // const data = this.academicForm.value;
    // data['date'] = moment(data['date']).format('YYYY-MM-DD');
    //     data['depature_time'] = moment(data['depature_time']).format('YYYY-MM-DD HH:mm:ss');
    // data['return_time'] = moment(data['return_time']).format('YYYY-MM-DD HH:mm:ss');

    this._academicService.academics(formModel).subscribe(data => {
      if (data.success) {
        this.toastr.successToastr('Uploaded Successfully.', 'Success!');

        this.getFileList();
        this.academicForm.reset();
        // this.academicForm.controls['c_id'].setValue('0');
        this.myFiles = [];
      } else {
      }
    });
  }

  edit(sid) {
    // this.academicForm.reset();
    if (sid !== '0') {
      this.filterData = _.filter(this.uploadfiles, function(item) {
        return item.c_id === sid;
      });
      console.log('fi', this.filterData);
      if (this.filterData && this.filterData.length > 0) {
        console.log('f12');
        this.academicForm.patchValue({
          c_id: this.filterData[0].c_id
        });
        const arr = [];
        this.filterData.forEach(item => {
          arr.push(
            this._fb.group({
              id: item.id,
              title: item.title,
              documents: item.filename,
              collapse: '1'
            })
          );
        });
        console.log('d', arr);
        this.academicForm.setControl('uploadFiles', this._fb.array(arr));
      }
      this.initAddress();
      //
    }
  }

  DownloadAttachment(name) {
    console.log('f', name);
    this._academicService.downloadAttachment(name).subscribe(res => {
      this.saveFile(res.blob(), name);
      // if (data.success) {
      //   // this.toastr.success('Attachement deleted successfully');
      // } else {
      //   this.toastr.error(' Error while deleting the Attachement');
      // }
    });
  }
  saveFile = (blobContent: Blob, fileName: string) => {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }

  addAcademics() {
    this.academicForm.reset();
    this.showAcademics = false;
  }

  showUpload(i) {
    if (this.showuploadfiles.indexOf(i) === -1) {
      this.showuploadfiles.push(i);
    } else {
      this.showuploadfiles = _.without(this.showuploadfiles, i);
    }
  }
}

// this.showuploadfiles = [];
// if (this.showuploadfiles.indexOf(i) === -1) {
//   this.filterData.forEach(item => {
//     this.showuploadfiles.push(
//       this._fb.group({
//         id: item.id,
//         title: item.title,
//         documents: item.filename,
//         collapse: '0'
//       })
//     );
//   });
//   console.log('d', this.showuploadfiles);
//   this.academicForm.setControl(
//     'uploadFiles',
//     this._fb.array(this.showuploadfiles)
//   );
// } else {
//   this.showuploadfiles = _.without(this.showuploadfiles, i);
// }
