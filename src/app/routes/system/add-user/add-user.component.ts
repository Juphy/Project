import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  DATA: Array<any> = [];
  data = [];
  begin_id: number = null;
  end_id: number = null;
  name: string = '';
  loading = false;
  total = 0;
  btnLoading = false;
  constructor(
    private http: HttpClient,
    private messageService: NzMessageService,
    private modalSerice: NzModalRef
  ) { }

  ngOnInit() {
    this.get_data();
  }


  get_data() {
    this.loading = true;
    this.http.get('api/manager/lost_users').subscribe(res => {
      this.loading = false;
      if (res['status'] === 200) {
        this.DATA = res['data'];
        this.DATA.forEach(item => {
          item['checked'] = true;
        })
        this.search_data();
      }
    }, err => {
      this.loading = false;
    })
  }

  search_data() {
    this.loading = true;
    this.data = [];
    if (this.begin_id && this.end_id) {
      this.begin_id = this.begin_id > this.end_id ? this.end_id : this.begin_id;
      this.data = this.DATA.filter(item => item.id >= this.begin_id && item.id <= this.end_id);
    }
    if (this.name) {
      if (this.data.length) {
        this.data = this.data.filter(item => item.name.includes(this.name));
      } else {
        this.data = this.DATA.filter(item => item.name.includes(this.name));
      }
    }
    if (!this.data.length) this.data = [...this.DATA];
    this.refresh_status();
    this.loading = false;
  }

  clear_data() {
    this.begin_id = null;
    this.end_id = null;
    this.name = '';
    this.search_data();
  }

  refresh_status() {
    let data = this.DATA.filter(item => item.checked);
    this.total = data.length;
  }

  add_msg_logs() {
    this.btnLoading = true;
    let users = [];
    this.DATA.forEach(item => {
      if (item.checked) users.push(item.id);
    })
    this.http.post('api/manager/add_msg_logs', { users }).subscribe(res => {
      this.btnLoading = false;
      if (res['status'] === 200) {
        this.messageService.success('发送成功！');
        this.modalSerice.destroy(true);
      }

    }, err => {
      this.btnLoading = false;
    })
  }
}
