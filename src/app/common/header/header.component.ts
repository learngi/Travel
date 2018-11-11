import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private _routes: Router) {}
  name = sessionStorage.getItem('name');
  ngOnInit() {}
  logOut() {
    sessionStorage.clear();
    this._routes.navigate(['/login']);
  }
}
