import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { siteinfo, userinfo, DATA } from "@core/store";
import { NzIconService } from "ng-zorro-antd";
import { ICONS } from "@core/style-icons";
@Injectable({
  providedIn: "root"
})
export class StartupService {
  constructor(private http: HttpClient, private iconService: NzIconService) {
    //  添加初始化图标
    this.iconService.addIcon(...ICONS);
  }

  load() {
    console.log("welcome!");
    this.http
      .post("api/manager_login", {
        account: "chengdicheng",
        password: 123456
      })
      .subscribe(res => {
        console.log(res);
        if (res["status"] === 200) {
          let data = res["data"];
          DATA["TOKEN"] = data["token"];
          let user_info = data["user_info"];
          userinfo["name"] = user_info["name"];
          userinfo["id"] = user_info["id"];
          userinfo["roles"] = user_info["roles"];
          userinfo["permission"] = data["permission_list"];
          userinfo["info"] = user_info;
        }
      });
  }

  // load(): Promise<any> {
  //     return new Promise((resolve, reject) => {
  //         resolve();
  //         reject();
  //     })
  // }
}
