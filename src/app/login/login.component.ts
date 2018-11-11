import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../common/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'admin';
  password = '1234';
  constructor(
    private _routes: Router,
    private _authService: AuthenticationService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {}

  submit() {
    const body = {
      username: this.username,
      password: this.password
    };

    if (body['username'] === '' || body['password'] === '') {
      this.toastr.errorToastr('Enter Username, Password', 'Error!');
      return;
    }
    this._authService.login(body).subscribe(data => {
      console.log('d', data);

      if (data.success) {
        this._routes.navigate(['/images']);
      } else {
        this.toastr.errorToastr(data.message, 'Error!');

        console.log('error');
      }
    });
  }
}
