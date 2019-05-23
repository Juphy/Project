import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.css"]
})
export class AddRoleComponent implements OnInit {
  permissionOptions = [];

  @Input() id: any;
  constructor(
    private http: HttpClient,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit() {}

  get_all_permission() {
    this.http.get("api/roles/permission").subscribe(res => {
      console.log(res);
    });
  }

  add_edit_role() {
    if (this.id) {
    } else {
    }
  }
}
