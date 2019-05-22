import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { FN } from "@core/store";
import { AddUserComponent } from "./add-user/add-user.component";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 16;
  pagesizeAry = [16, 32, 48];
  loading = false;
  total = 0;

  fn = {};
  visible = false;
  visibleLoading = false;
  user_id;
  balance;
  gold;
  type; // 1 balance  2 gold
  constructor(
    private modalService: NzModalService,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {
    console.log(FN["user_list"]);
    this.fn = FN["user_list"];
  }

  ngOnInit() {}

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    this.loading = true;
    this.http.post("api/manager/user_list", params).subscribe(
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
      nzTitle: "添加用户",
      nzContent: AddUserComponent,
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

  delete_user(user_id) {
    this.http.post("api/manager/delete_user", { user_id }).subscribe(res => {
      if (res["status"] === 200) {
        this.messageService.success("删除成功！");
        this.get_data();
      }
    });
  }

  change_status(user_id, status) {
    this.http
      .post("api/user/change_user_status", { user_id, status })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.messageService.success("操作成功！");
        }
      });
  }

  activate_member(user_id) {
    this.http
      .post("api/manager/activate_member", { user_id })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.messageService.success("激活用户成功！");
          this.get_data();
        }
      });
  }

  reset_password(user_id) {
    this.http.post("api/manager/reset_password", { user_id }).subscribe(res => {
      if (res["status"] === 200) {
        this.messageService.success("重置密码成功！");
        this.get_data();
      }
    });
  }

  change_balance_gold(user_id, type) {
    this.user_id = user_id;
    this.type = type;
    this.visible = true;
  }

  make_sure() {
    this.visibleLoading = true;
    switch (this.type) {
      case 1:
        this.http.post("api/manager/change_balance", {balance: this.balance, user_id: this.user_id}).subscribe(res =>{
          this.visibleLoading = false;
          if(res['status']===200){
            this.messageService.success('修改成功！');
            this.visible = false;
          }
        }, e =>{
            this.visibleLoading = false;
        });  
        break;
      case 2:
      case 1:
        this.http.post("api/manager/change_mutual_gold", { mutual_gold: this.gold, user_id: this.user_id }).subscribe(res => {
          this.visibleLoading = false;
          if (res['status'] === 200) {
            this.messageService.success('修改成功！');
            this.visible = false;
          }
        }, e => {
          this.visibleLoading = false;
        });  
        break;
    }
  }

  cancel() {
    this.visible = false;
    this.visibleLoading = false;
  }

  user_child_list() {}

  user_parent_list() {}
}
