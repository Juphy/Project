import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import * as XLSX from 'xlsx';

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
    if (!this.begin_id && !this.end_id && !this.name) this.data = [...this.DATA];
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
    let data = this.data.filter(item => item.checked);
    this.total = data.length;
  }

  add_msg_logs() {
    this.btnLoading = true;
    let users = [];
    this.data.forEach(item => {
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

  export_data() {
    let datas = [], obj = {
      'id': '用户ID',
      'snum': '用户编号',
      'name': '用户名称',
      'phone': '电话',
      'lose_time': '即将失效日期'
    };
    this.DATA.forEach(item => {
      let o = {};
      Object.keys(obj).forEach(key => {
        o[obj[key]] = item[key]
      })
      datas.push(o);
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datas);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, '用户列表.xlsx');
  }
}
