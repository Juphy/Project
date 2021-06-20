import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { userinfo, DATA } from "@core/store";
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
    DATA["TOKEN"] = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    userinfo["name"] = localStorage.getItem("name")
      ? localStorage.getItem("name")
      : "";
    userinfo["id"] = localStorage.getItem("id")
      ? localStorage.getItem("id")
      : "";
    userinfo["permission"] = localStorage.getItem("permission")
      ? JSON.parse(localStorage.getItem("permission"))
      : [];
  }

  // load(): Promise<any> {
  //     return new Promise((resolve, reject) => {
  //         resolve();
  //         reject();
  //     })
  // }
}
