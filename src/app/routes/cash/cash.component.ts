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
    "-1": "失败",
    "0": "申请中",
    "1": "成功"
  };
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {}

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
        console.log(res);
        this.loading = false;
        if (res["status"] === 200) {
          let data = res["data"];
          this.data = data["data"] || [];
          this.total = data["total"] || 0;
        }
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
        console.log(res);
        if (res["status"] === 200) {
          this.messageService.success("审核操作成功！");
          this.get_data();
        }
      });
  }
}
