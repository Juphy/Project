import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzModalService } from "ng-zorro-antd";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit {
  begin_id;
  end_id;
  datetime;
  current = 0;
  data = [];
  total = 0;
  loading = false;
  btnLoading = false;
  flowers;
  description = '';
  start_flowers = null;
  end_flowers = null;
  formatterPercent = (value: number) => value ? value.toFixed(0) : value;
  constructor(
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService,
    private http: HttpClient,
    private datePipe: DatePipe,
    private nzModalService: NzModalService,
  ) { }

  refresh_status() {
    let data = this.data.filter(item => item.checked);
    this.total = data.length;
  }

  ngOnInit() {

  }

  show_modal() {
    this.nzModalService.confirm({
      nzTitle: '【*警 告*】',
      nzContent: '重新搜索之后，之前勾选的用户不在圈定的范围内！',
      nzOnOk: () => {
        this.get_data();
      },
      nzOnCancel: () => { }
    })
  }

  get_data() {
    let params;
    if (this.begin_id && this.end_id) {
      this.begin_id = this.begin_id > this.end_id ? this.end_id : this.begin_id;
      params = {
        begin_id: this.begin_id,
        end_id: this.end_id
      }
    }

    if (this.datetime && this.datetime[0] && this.datetime[1]) {
      if (!params) params = {};
      params['begin_created_at'] = this.datePipe.transform(this.datetime[0], 'yyyy-MM-dd');
      params['end_created_at'] = this.datePipe.transform(this.datetime[1], 'yyyy-MM-dd');
    }

    if (this.start_flowers !== null && this.end_flowers !== null) {
      if (!params) params = {};
      params['start_flowers'] = this.start_flowers * 100;
      params['end_flowers'] = this.end_flowers * 100;
    }

    if (!params) {
      this.nzMessageService.warning('没有搜索条件无法搜索！');
      return;
    }
    this.loading = true;
    this.http.post('manager/batch_flowers', params).subscribe(res => {
      this.loading = false;
      this.data = res['result'] || [];
      this.data.forEach(item => {
        item['checked'] = true;
      })
      this.total = this.data.length;
    })
  }

  change_current(value) {
    this.current = value;
  }

  done() {
    let user_list = [];
    this.data.forEach(item => {
      if (item.checked) {
        user_list.push(item.id);
      }
    })
    let params = {
      user_list,
      description: this.description
    };
    if (!this.flowers) {
      this.nzMessageService.warning('没有填写鲜花数！');
      return;
    }
    params['flowers'] = this.flowers*100;
    this.btnLoading = true;
    this.http.post('api/manager/add_flowers', params).subscribe(res => {
      this.btnLoading = false;;
      if (res['status'] === 200) {
        this.nzMessageService.success('批量操作成功！');
        this.nzModalRef.destroy(true);
      }
    }, err => {
      this.btnLoading = false;
    })
  }

  cancel() {
    this.nzModalRef.destroy(false);
  }

}
