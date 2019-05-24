import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { FN } from "@core/store";
import { AddManagerComponent } from "./add-manager/add-manager.component";
@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.css"]
})
export class ManagerComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 16;
  pagesizeAry = [16, 32, 48];
  loading = false;
  total = 0;

  fn = {};
  constructor(
    private modalService: NzModalService,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {
    console.log(FN["manager_list"]);
    this.fn = FN["manager_list"];
  }

  ngOnInit() {}

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    this.loading = true;
    this.http.post("api/manager/manager_list", params).subscribe(
      res => {
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
    this.search_data(true);
  }

  show_modal() {
    let modal;
    modal = this.modalService.create({
      nzTitle: "添加管理员",
      nzContent: AddManagerComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1000
    });
    modal.afterClose.subscribe(res => {
      if (res) {
        this.search_data();
      }
    });
  }

  delete_manager(user_id) {
    this.http.post("api/manager/delete_manager", { user_id }).subscribe(res => {
      if (res["status"] === 200) {
        this.messageService.success('删除成功！');
        this.get_data();
      }
    });
  }
}
