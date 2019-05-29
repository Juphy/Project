import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { URL, userinfo } from '@core/store';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  go_to() {
    let a = userinfo.permission.find(item => item.description === '1')
    if (!a) {
      this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl(URL[a.name])
    }
  }
}
