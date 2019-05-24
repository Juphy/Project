import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { AddRoleComponent } from "./add-role/add-role.component";

@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.css"]
})
export class RoleComponent implements OnInit {
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
  ) {}

  ngOnInit() {}

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    this.loading = true;
    this.http.get("api/roles/index").subscribe(
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

  show_modal(flag?: boolean, data?: any) {
    let modal;
    if (flag) {
      modal = this.modalService.create({
        nzTitle: "添加角色",
        nzContent: AddRoleComponent,
        nzComponentParams: {
          id: data.id
        },
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: 1000
      });
    } else {
      modal = this.modalService.create({
        nzTitle: "添加角色",
        nzContent: AddRoleComponent,
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: 1000
      });
    }
    modal.afterClose.subscribe(res => {
      if (res) {
        this.search_data();
      }
    });
  }
}
