import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.scss"]
})
export class AddRoleComponent implements OnInit {
  permissionOptions = [];

  @Input() id: any;
  constructor(
    private http: HttpClient,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit() {
    if (this.id) {
      this.http.post("api/role/info", { id: this.id }).subscribe(res => {
        console.log(res);
      });
    } else {
      this.get_all_permission();
    }
  }

  get_all_permission() {
    this.http.post("api/roles/permission", {}).subscribe(res => {
      console.log(res);
      if (res["status"] === 200) {
        let data = res["data"];
        let roles = [];
        data.forEach(item => {
          if (item.pid === 0) {
            roles.push({
              id: item.id,
              name: item.display_name,
              checked: false
            });
          }
        });
        roles.forEach(item => {
          let children = [];
          data.forEach(_item => {
            if (_item.pid === item.id) {
              children.push({
                id: _item.id,
                name: _item.display_name
              });
            }
          });
          item["children"] = children;
        });
        this.permissionOptions = [...roles];
      }
    });
  }

  add_edit_role() {
    if (this.id) {
    } else {
    }
  }
}
