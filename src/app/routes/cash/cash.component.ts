import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-cash",
  templateUrl: "./cash.component.html",
  styleUrls: ["./cash.component.css"]
})
export class CashComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 16;
  pagesizeAry = [16, 32, 48];
  loading = false;
  total = 0;
  user_name;
  date;
  status = {
    "-1": "未通过",
    "0": "申请中",
    "1": "已通过"
  };
  max = 1;
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    if (this.user_name) {
      params["user_name"] = this.user_name;
    }
    if (this.date) {
      params["begin_time"] = this.datePipe.transform(
        this.date[0],
        "yyyy-MM-dd"
      );
      params["end_time"] = this.datePipe.transform(this.date[1], "yyyy-MM-dd");
    }
    this.loading = true;
    this.http.post("api/manager/cash_list", params).subscribe(
      res => {
        this.loading = false;
        this.data = res["data"] || [];
        this.total = res["total"] || 0;
        this.pagesize = res['per_page'] || 15;
        this.max = res['last_page'] || 1;
      },
      err => {
        this.loading = false;
      }
    );
  }

  search_data(flag?: boolean) {
    if (flag) {
      this.page = 1;
    }
    this.get_data();
  }

  clear_data() {
    this.user_name = "";
    this.date = null;
    this.search_data(true);
  }

  check_cash(cash_id, status) {
    this.http
      .post("api/manager/check_cash", { cash_id, status })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.messageService.success("审核操作成功！");
          this.get_data();
        }
      });
  }

  cancel() { }
}
