import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DATA, userinfo, URL } from "@core/store";
import { NzMessageService } from "ng-zorro-antd";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  title = "用户管理系统";
  description = "";
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private nzMessageService: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  get account() {
    return this.validateForm.controls.account;
  }

  get password() {
    return this.validateForm.controls.password;
  }

  submit_form(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.account.invalid || this.password.invalid) return;
    this.http
      .post("api/manager_login", {
        account: this.account.value,
        password: this.password.value
      })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.nzMessageService.success(res["message"]);
          let data = res["data"];
          DATA["TOKEN"] = data["token"];
          let user_info = data["user_info"];
          userinfo["name"] = user_info["name"];
          userinfo["id"] = user_info["id"];
          userinfo["roles"] = user_info["roles"];
          userinfo["permission"] = data["permission_list"];
          userinfo["info"] = user_info;
          // localStorage存储信息
          localStorage.setItem("token", data["token"]);
          localStorage.setItem("name", user_info["name"]);
          localStorage.setItem("id", user_info["id"]);
          localStorage.setItem("roles", JSON.stringify(user_info["roles"]));
          localStorage.setItem(
            "permission",
            JSON.stringify(data["permission_list"])
          );
          let a = data['permission_list'].find(item => item.description == 1);
          let url = URL[a['name']];
          this.router.navigateByUrl(url);
        }
      });
  }
}
