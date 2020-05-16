import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { DatePipe } from "@angular/common";
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {
  btnLoading = false;
  data = [];
  page = 1;
  pagesize = 16;
  pagesizeAry = [16, 32, 48]
  loading = false;
  total = 0;
  max = 1;

  user_name = '';
  user_id = null;
  phone = '';
  result = '';
  datetime;
  ResultObj = {
    0: '待发送',
    1: '成功',
    2: '失败'
  };
  ResultList = [
    { name: '待发送', value: 0 },
    { name: '成功', value: 1 },
    { name: '失败', value: 2 }
  ];
  constructor(
    private http: HttpClient,
    private messageService: NzMessageService,
    private datePipe: DatePipe,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.get_data();
  }

  send_message() {
    // this.btnLoading = true;
    // this.http.get('api/manager/send_unqualified_user').subscribe(res => {
    //   this.btnLoading = false;
    //   if (res['status'] === 200) {
    //     this.messageService.success("当前发送成功！");
    //     this.get_data();
    //   }
    // }, err => {
    //   this.btnLoading = false;
    // })
    let modal = this.modalService.create({
      nzTitle: '选择用户范围',
      nzContent: AddUserComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 800
    });
    modal.afterClose.subscribe(res => {
      if (res) this.get_data();
    })
  }

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    if (this.user_id) params['user_id'] = this.user_id;
    if (this.user_name) params['user_name'] = this.user_name;
    if (this.phone) params['phone'] = this.phone;
    if (this.result) params['result'] = this.result;
    if (this.datetime) {
      this.datetime[0] &&
        (params["begin_time"] = this.datePipe.transform(
          this.datetime[0],
          "yyyy-MM-dd HH:mm:ss"
        ));
      this.datetime[1] &&
        (params["end_time"] = this.datePipe.transform(
          this.datetime[1],
          "yyyy-MM-dd HH:mm:ss"
        ));
    }
    this.loading = true;
    this.http.post('api/manager/msg_logs', params).subscribe(res => {
      this.loading = false;
      this.data = res['data'] || [];
      this.total = res["total"] || 0;
      this.pagesize = res['per_page'] || 15;
      this.max = res['last_page'] || 1;
    }, err => {
      this.loading = false;
    })
  }

  search_data(flag?: boolean) {
    if (flag) {
      this.page = 1;
    }
    this.get_data();
  }

  clear_data() {
    this.user_name = '';
    this.user_id = null;
    this.phone = '';
    this.result = '';
    this.datetime = null;
    this.search_data(true);
  }

  send_msg(id) {
    this.http.post('api/manager/send_msg', { id }).subscribe(res => {
      if (res['status'] === 200) {
        this.messageService.success('重新发送成功！');
        this.get_data();
      };
    })
  }
}
