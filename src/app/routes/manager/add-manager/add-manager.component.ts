import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
@Component({
  selector: "app-add-manager",
  templateUrl: "./add-manager.component.html",
  styleUrls: ["./add-manager.component.scss"]
})
export class AddManagerComponent implements OnInit {
  snum;
  name;
  password;
  _password;
  rolesOption = [];
  flag = false;
  @Input() id;
  constructor(
    private http: HttpClient,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit() {
    if (this.id) {
      this.http
        .post("api/manager/manager_info", { id: this.id })
        .subscribe(res => {
          if (res["status"] === 200) {
            let data = res["data"];
            let roles = data["roles"];
            let info = data["manager_info"];
            this.name = info.name;
            this.snum = info.snum;
            this.get_roles(roles);
          }
        });
    } else {
      this.get_roles();
    }
  }

  get_roles(roles?: Array<any>) {
    this.http.post("api/roles/index", {}).subscribe(res => {
      if (res["status"] === 200) {
        res["data"].forEach(item => {
          this.rolesOption.push({
            id: item.id,
            name: item.name,
            checked: roles ? roles.includes(item.id) : false
          });
        });
      }
    });
  }

  check_password(flag) {
    if (flag) {
      if (this.password && this.password !== this._password) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    } else {
      if (this._password && this.password !== this._password) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  }

  add_edit_manager() {
    if (!this.snum) {
      this.nzMessageService.warning("账号不能为空！");
      return;
    }
    if (!this.name) {
      this.nzMessageService.warning("姓名不能为空！");
      return;
    }
    if (!this.password) {
      this.nzMessageService.warning("密码不能为空！");
      return;
    }
    if (this.flag) return;
    let role_ids = [];
    this.rolesOption.forEach(item => {
      if (item.checked) {
        role_ids.push(item.id);
      }
    });
    if (!role_ids.length) {
      this.nzMessageService.warning("角色不能为空！");
      return;
    }
    let params = {
      name: this.name,
      snum: this.snum,
      password: this.password,
      role_ids
    };
    if (this.id) {
      params["id"] = this.id;
    }
    this.http.post("api/manager/add_manager", params).subscribe(res => {
      if (res["status"] === 200) {
        if (this.id) {
          this.nzMessageService.success("编辑成功！");
        } else {
          this.nzMessageService.success("添加成功！");
        }
        this.nzModalRef.destroy(true);
      }
    });
  }

  cancel() {
    this.nzModalRef.destroy(false);
  }
}
