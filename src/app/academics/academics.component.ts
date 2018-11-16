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
  acadamicDetails: any = [];
  acadamicList: any = [];
  constructor(
    private _academicService: AcademicService,
    private _fb: FormBuilder,
    public toastr: ToastrManager
  ) {}
  academicForm: FormGroup;
  showAcademics = true;
  tourPlaceList = [];
  filterData = [];
  c_id = '';
  uploadfiles = [];
  showuploadfiles = [];
  message = '';
  ngOnInit() {
    this.getSubjectsList();
    this.getAllAcadamicsList();
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
      collapse: ['0']
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

  // for faculties
  getSubjectsList() {
    console.log('her');
    this._academicService.getSubjects().subscribe(data => {
      if (data.success) {
        this.tourPlaceList = data.data;
      }
    });
  }

  // filter Tour place list
  filterTours(id) {
    const temp = _.filter(this.tourPlaceList, (item) => item.id === parseInt(id, 10));

    return temp[0].place_name;
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
    const arr = this.academicForm.value['uploadFiles'];
    const data = this.academicForm.value;
    input.append('name', data.c_id);
    input.append('availability', data.avalibility);
    input.append('amount', data.amount);
    input.append('date', moment(data.dt).format('YYYY-MM-DD HH:mm:ss'));
    input.append('depature', data.depature);
    input.append(
      'depature_time',
      moment(data.depature_time).format('YYYY-MM-DD HH:mm:ss')
    );
    input.append(
      'return_time',
      moment(data.return_time).format('YYYY-MM-DD HH:mm:ss')
    );
    input.append('no_of_days', data.no_of_days);

    let i = 0;
    arr.forEach(element => {
      files.push({
        day: element.day,
        description: element.title,
        image: element.documents.name
      });
      if (element.documents) {
        input.append(`fileUpload${i}`, element.documents);
        i++;
      }
    });
    input.append('uploadFiles', JSON.stringify(files));

    console.log('INPUT', input);
    return input;
  }

  // save academics
  saveNews() {
    const formModel = this.prepareSave();

    console.log(this.academicForm.value);

    this._academicService.academics(formModel).subscribe(data => {
      console.log(data, 'response');

      if (data.success) {
        this.back();
        this.toastr.successToastr('Uploaded Successfully.', 'Success!');

        this.academicForm.reset();
        this.academicForm.controls['c_id'].setValue('0');
      } else {
      }
    });
  }





  addAcademics() {
    this.academicForm.reset();
    this.showAcademics = false;
  }

  back() {
    this.showAcademics = true;
  }
  showUpload(i) {
    if (this.showuploadfiles.indexOf(i) === -1) {
      this.showuploadfiles.push(i);
    } else {
      this.showuploadfiles = _.without(this.showuploadfiles, i);
    }
  }

  getAllAcadamicsDetails(item) {
    this._academicService
      .getAllAcadamicsDetails({ aid: item.aid })
      .subscribe(details => {
        console.log(details, 'Details Response');
        if (details.success) {
          this.acadamicDetails = details.data;
        } else {
          this.acadamicDetails = [];
        }
      });
  }

  getAllAcadamicsList() {
    this._academicService.getAllAcadamicsList().subscribe(list => {
      console.log(list, 'Details Response');
      if (list.success) {
        this.acadamicList = list.data;
      } else {
        this.acadamicList = [];
      }
    });
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
