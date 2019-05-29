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
  mutual_gold;
  description = '';
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
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
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
      params['begin_created_at'] = this.datePipe.transform(this.datetime[0], 'yyyy-MM-dd');
      params['end_created_at'] = this.datePipe.transform(this.datetime[1], 'yyyy-MM-dd');
    }

    if (!params) {
      this.nzMessageService.warning('没有搜索条件无法搜索！');
      return;
    }
    this.loading = true;
    this.http.post('api/manager/batch_mutual_gold', params).subscribe(res => {
      this.loading = false;
      this.data = [...res['data']];
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
    if (!this.mutual_gold) {
      this.nzMessageService.warning('没有填写互助金！');
      return;
    }
    params['mutual_gold'] = this.mutual_gold * 100;
    this.btnLoading = true;
    this.http.post('api/manager/add_mutual_gold', params).subscribe(res => {
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
