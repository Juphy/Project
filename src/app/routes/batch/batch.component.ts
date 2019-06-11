import { BatchDetailComponent } from './batch-detail/batch-detail.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { FN } from '@core/store';
@Component({
  selector: "app-batch",
  templateUrl: "./batch.component.html",
  styleUrls: ["./batch.component.css"]
})
export class BatchComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 15;
  loading = false;
  total = 0;
  description;
  datetime;
  fn = {};
  max = 1
  constructor(
    private modalService: NzModalService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {
    this.fn = FN['batch_mutual_gold_list'];
  }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    if (this.description) {
      params["description"] = this.description;
    }
    if (this.datetime) {
      params["begin_time"] = this.datePipe.transform(
        this.datetime[0],
        "yyyy-MM-dd"
      );
      params["end_time"] = this.datePipe.transform(
        this.datetime[1],
        "yyyy-MM-dd"
      );
    }
    this.loading = false;
    this.http
      .post("api/manager/batch_mutual_gold_list", params)
      .subscribe(res => {
        if (res["status"] === 200) {
          let data = res["data"];
          this.data = data["data"] || [];
          this.total = data["total"];
          this.pagesize = data['per_page'];
          this.max = data['last_page'];
        }
      });
  }

  search_data(flag?: boolean) {
    if (flag) {
      this.page = 1;
    }
    this.get_data();
  }

  clear_data() {
    this.description = '';
    this.datetime = null;
    this.get_data();
  }

  show_modal() {
    let modal;
    modal = this.modalService.create({
      nzTitle: '添加批量操作',
      nzContent: AddBatchComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1000
    });
    modal.afterClose.subscribe(res => {
      if (res) {
        this.search_data(true);
      }
    })
  }

  show_detail(id) {
    let modal;
    modal = this.modalService.create({
      nzTitle: '查看批量操作详情',
      nzContent: BatchDetailComponent,
      nzComponentParams: { id },
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1250
    });
  }
}
