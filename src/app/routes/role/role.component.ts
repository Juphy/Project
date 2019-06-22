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
  status = {
    '0': '禁用',
    '1': '正常'
  };

  max = 1;
  constructor(
    private modalService: NzModalService,
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {
      page: this.page
    };
    this.loading = true;
    this.http.post("api/roles/index", {}).subscribe(
      res => {
        this.loading = false;
        if (res["status"] === 200) {
          let data = res["data"];
          this.data = [...data];
          this.total = this.data.length;
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

  }

  show_modal(id?: any) {
    let modal;
    if (id) {
      modal = this.modalService.create({
        nzTitle: "编辑角色",
        nzContent: AddRoleComponent,
        nzComponentParams: {
          id
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

  delete_role(id) {
    this.http.post('api/roles/delete', { id }).subscribe(res => {
      if (res['status'] === 200) {
        this.messageService.success('删除成功！');
        this.get_data();
      }
    })
  }

  restore_role(id) {
    this.http.post('api/roles/restore_roles', { id }).subscribe(res => {
      if (res['status'] === 200) {
        this.messageService.success('恢复成功！');
        this.get_data();
      }
    })
  }

}
