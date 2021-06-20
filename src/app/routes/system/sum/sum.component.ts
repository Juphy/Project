import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd";
@Component({
  selector: "app-sum",
  templateUrl: "./sum.component.html",
  styleUrls: ["./sum.component.css"]
})
export class SumComponent implements OnInit {
  num;
  _num = 0;
  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.get_sum_user();
  }

  get_sum_user() {
    this.http.post("home/get_sum_user", {}).subscribe(res => {
      if (res["status"] === 200) {
        this.num = res["result"];
        this._num = this.num;
      }
    });
  }

  change_num() {
    this.http
      .post("api/manager/change_sum_user", { num: this._num })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.messageService.success("修改用户总数成功！");
          this.get_sum_user();
        }
      });
  }
}
