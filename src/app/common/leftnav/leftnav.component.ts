import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {
  constructor(private _routes: Router, private _route: ActivatedRoute) {}
  pageType = '';

  ngOnInit() {
    this.pageType = this._route.snapshot.url[0].path;
    console.log('pagetpye', this.pageType);
  }
  navigation(type) {
    switch (type) {
      case 'academics':
        this._routes.navigate(['/academics']);
        break;
      case 'news':
        this._routes.navigate(['/news']);
        break;
      case 'images':
        this._routes.navigate(['/images']);
        break;
      case 'announcements':
        this._routes.navigate(['/announcements']);
        break;
    }
  }
}
