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
      .post("home/manager_login", {
        snum: this.account.value,
        password: this.password.value
      })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.nzMessageService.success('登录成功！');
          let data = res["result"];
          data['permissions'] = data['permissions'].filter(item => item.belong_to === 'admin');
          DATA["TOKEN"] = data["token"];
          userinfo["name"] = data["name"];
          userinfo["id"] = data["id"];
          userinfo["permission"] = data["permissions"];
          userinfo["info"] = data;
          // localStorage存储信息
          localStorage.setItem("token", data["token"]);
          localStorage.setItem("name", userinfo["name"]);
          localStorage.setItem("id", userinfo["id"]);
          localStorage.setItem(
            "permission",
            JSON.stringify(data["permissions"])
          );
          let a = data['permissions'].find(item => item.pid == 0);
          let url = URL[a['display_name']];
          console.log(url);
          this.router.navigateByUrl(url);
        }
      });
  }
}
