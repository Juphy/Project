import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-pay",
  templateUrl: "./pay.component.html",
  styleUrls: ["./pay.component.css"]
})
export class PayComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 16;
  pagesizeAry = [16, 32, 48];
  loading = false;
  total = 0;

  name;
  datetime;
  constructor(
    private http: HttpClient,
    private messageService: NzMessageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    if (this.name) {
      params["user_name"] = this.name;
    }
    if (this.datetime) {
      this.datetime[0] &&
        (params["begin_time"] = this.datePipe.transform(
          this.datetime[0],
          "yyyy-MM-dd"
        ));
      this.datetime[1] &&
        (params["end_time"] = this.datePipe.transform(
          this.datetime[1],
          "yyyy-MM-dd"
        ));
    }
    this.loading = true;
    this.http.post("api/manager/pay_list", params).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        let data = res["data"];
        this.data = [...data] || [];
        this.total = res["total"] || 0;
        this.data.forEach(item => {
          let b = "0000000";
          let a = item["pay_for_user"].toString();
          item["pay_for_user"] = "CC" + b.slice(a.length - 1, -1) + a;
        });
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
    this.name = "";
    this.datetime = null;
    this.search_data(true);
  }
}
