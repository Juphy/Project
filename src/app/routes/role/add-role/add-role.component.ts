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
  name = '';
  @Input() id: any;
  constructor(
    private http: HttpClient,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit() {
    if (this.id) {
      this.http.post("api/roles/info", { id: this.id }).subscribe(res => {
        if (res['status'] === 200) {
          let data = res['data'];
          this.name = data.name;
          let permission = data['permission'];
          this.get_all_permission(permission);
        }
      });
    } else {
      this.get_all_permission();
    }
  }

  get_all_permission(permission?: Array<any>) {
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
              checked: (permission && permission.includes(Number(item.id))) || false
            });
          }
        });
        roles.forEach(item => {
          let children = [];
          data.forEach(_item => {
            if (_item.pid === item.id) {
              children.push({
                id: _item.id,
                name: _item.display_name,
                checked: (permission && permission.includes(Number(_item.id))) || false
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
      let permission_ids = [];
      this.permissionOptions.forEach(item => {
        if (item.checked) {
          permission_ids.push(item.id);
        }
        item.children.forEach(_item => {
          if (_item.checked) {
            permission_ids.push(_item.id);
          }
        })
      })
      console.log(permission_ids);
      this.http.post('api/roles/add', {
        name: this.name,
        permission_ids: permission_ids.join(',')
      }).subscribe(res => {
        console.log(res);
        if (res['status'] === 200) {
          this.nzMessageService.success('添加成功！');
          this.nzModalRef.destroy(true);
        }
      })
    }
  }

  cancel() {
    this.nzModalRef.destroy(false);
  }

  change_checked(id) {
    console.log(id);
    this.permissionOptions.forEach(item => {
      if (item.children.some(_item => _item.id == id)) item.checked = true;
    })
  }
}
