import { ListComponent } from './list/list.component';
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { FN } from "@core/store";
import { AddUserComponent } from "./add-user/add-user.component";
import { DatePipe } from "@angular/common";
import * as XLSX from 'xlsx';
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 15;
  pagesizeAry = [16, 32, 48];
  loading = false;
  total = 0;

  fn = {};
  visible = false;
  visibleLoading = false;
  user_id;
  balance;
  gold;
  type; // 1 balance  2 gold   3 修改推荐人

  max = 1;

  status = {
    "0": "未激活",
    "1": "已激活",
    "2": "已禁用"
  };

  name = "";
  snum;
  address = "";
  sex;
  datetime;

  parent_snum;

  start_mutual_gold = null;
  end_mutual_gold = null;
  phone = '';
  _status = null;
  btnLoading = false;
  is_lost = null;
  formatterPercent = (value: number) => value ? value.toFixed(2) : value;

  btnLoading1 = false;
  constructor(
    private modalService: NzModalService,
    private http: HttpClient,
    private messageService: NzMessageService,
    private datePipe: DatePipe
  ) {
    this.fn = FN["user_list"];
  }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    if (this.name) {
      params["name"] = this.name;
    }
    if (this.snum) {
      params["snum"] = this.snum;
    }
    if (this.address) {
      params["address"] = this.address;
    }
    if (this.datetime) {
      this.datetime[0] &&
        (params["regist_begin_time"] = this.datePipe.transform(
          this.datetime[0],
          "yyyy-MM-dd"
        ));
      this.datetime[1] &&
        (params["regist_end_time"] = this.datePipe.transform(
          this.datetime[1],
          "yyyy-MM-dd"
        ));
    }
    if (this.start_mutual_gold !== null && this.end_mutual_gold !== null) {
      params['start_mutual_gold'] = (this.start_mutual_gold * 100).toFixed(0);
      params['end_mutual_gold'] = (this.end_mutual_gold * 100).toFixed(0);
    }
    if (this.phone) {
      params['phone'] = this.phone;
    }
    if (this._status !== null) {
      params['status'] = this._status;
    }
    if (this.is_lost === 0 || this.is_lost === 1) params['is_lost'] = this.is_lost;
    this.loading = true;
    this.http.post("api/manager/user_list", params).subscribe(
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
    this.name = "";
    this.snum = "";
    this.address = "";
    this.datetime = null;
    this.start_mutual_gold = null;
    this.end_mutual_gold = null;
    this._status = null;
    this.search_data(true);
  }

  show_modal(data) {
    let modal;
    if (data) {
      modal = this.modalService.create({
        nzTitle: "编辑用户",
        nzContent: AddUserComponent,
        nzComponentParams: {
          data
        },
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: 1000
      });
    } else {
      modal = this.modalService.create({
        nzTitle: "添加用户",
        nzContent: AddUserComponent,
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
      .post("api/manager/change_user_status", { user_id, status })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.messageService.success("操作成功！");
          this.get_data();
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

  show_balance_gold(user_id, type, num) {
    this.user_id = user_id;
    this.type = type;
    switch (this.type) {
      case 1:
        this.balance = (num / 100).toFixed(2);
        break;
      case 2:
        this.gold = (num / 100).toFixed(2);
        break;
      case 3:
        this.parent_snum = num;
        break;
    }
    this.visible = true;
  }

  make_sure() {
    this.visibleLoading = true;
    switch (this.type) {
      case 1:
        this.http
          .post("api/manager/change_balance", {
            balance: Number(this.balance) * 100,
            user_id: this.user_id
          })
          .subscribe(
            res => {
              this.visibleLoading = false;
              if (res["status"] === 200) {
                this.messageService.success("修改成功！");
                this.visible = false;
                this.get_data();
              }
            },
            e => {
              this.visibleLoading = false;
            }
          );
        break;
      case 2:
        this.http
          .post("api/manager/change_mutual_gold", {
            mutual_gold: Number(this.gold) * 100,
            user_id: this.user_id
          })
          .subscribe(
            res => {
              this.visibleLoading = false;
              if (res["status"] === 200) {
                this.messageService.success("修改成功！");
                this.visible = false;
                this.get_data();
              }
            },
            e => {
              this.visibleLoading = false;
            }
          );
        break;
      case 3:
        this.http.post('api/manager/change_parent_snum', {
          parent_snum: this.parent_snum,
          user_id: this.user_id
        }).subscribe(res => {
          this.visibleLoading = false;
          if (res['status'] === 200) {
            this.messageService.success("修改成功！");
            this.visible = false;
            this.get_data();
          }
        }, e => {
          this.visibleLoading = false;
        })
        break;
    }
  }

  cancel() {
    this.visible = false;
    this.visibleLoading = false;
  }

  user_child_list(user_id) {
    this.modalService.create({
      nzTitle: "查看子级",
      nzContent: ListComponent,
      nzComponentParams: {
        user_id,
        type: 1
      },
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1600
    })

  }

  user_parent_list(user_id) {
    this.modalService.create({
      nzTitle: "查看父级",
      nzContent: ListComponent,
      nzComponentParams: {
        user_id,
        type: 0
      },
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1000
    })
  }

  download_data() {
    let params = { download_excel: 1 };
    if (this.name) {
      params["name"] = this.name;
    }
    if (this.snum) {
      params["snum"] = this.snum;
    }
    if (this.datetime) {
      this.datetime[0] &&
        (params["regist_begin_time"] = this.datePipe.transform(
          this.datetime[0],
          "yyyy-MM-dd"
        ));
      this.datetime[1] &&
        (params["regist_end_time"] = this.datePipe.transform(
          this.datetime[1],
          "yyyy-MM-dd"
        ));
    }
    if (this.start_mutual_gold !== null && this.end_mutual_gold !== null) {
      params['start_mutual_gold'] = (this.start_mutual_gold * 100).toFixed(0);
      params['end_mutual_gold'] = (this.end_mutual_gold * 100).toFixed(0);
    }
    if (this.phone) {
      params['phone'] = this.phone;
    }
    if (this._status !== null) {
      params['status'] = this._status;
    }
    if (this.is_lost === 0 || this.is_lost === 1) params['is_lost'] = this.is_lost;
    this.btnLoading = true;
    this.http.post('api/manager/user_list', params).subscribe(res => {
      this.btnLoading = false;
      let data: any = res;
      let datas = [], obj = {
        'snum': '会员编号',
        'parent_snum': '推荐人编号',
        'id_card': '身份证号',
        'name': '姓名',
        'phone': '电话',
        'address': '地址'
      };
      data.forEach(item => {
        let o = {};
        for (let key in item) {
          if (obj[key]) o[obj[key]] = item[key];
          if (key === 'balance') {
            o['余额（元）'] = (item[key] / 100).toFixed(2);
          }
          if (key === 'mutual_gold') {
            o['互助金（元）'] = (item[key] / 100).toFixed(2);
          }
          if (key === 'status') {
            o['状态'] = item.invalid === 1 ? '已删除' : this.status[item[key]];
          }
          if (key === 'created_at') {
            o['创建时间'] = item[key].split(' ')[0];
          }
        }
        datas.push(o);
      })
      console.log(datas);
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datas);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, '用户列表.xlsx');
    }, err => {
      this.btnLoading = false;
    })
  }
}
