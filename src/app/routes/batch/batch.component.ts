import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd";
@Component({
  selector: "app-batch",
  templateUrl: "./batch.component.html",
  styleUrls: ["./batch.component.css"]
})
export class BatchComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 16;
  pagesizeAry = [16, 32, 48];
  loading = false;
  total = 0;
  description;
  datetime;
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {}

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
        }
      });
  }
}
