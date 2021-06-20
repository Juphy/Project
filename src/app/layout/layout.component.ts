import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { userinfo, app, URL, ICON, FN } from "@core/store";
import { Router } from '@angular/router';
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  name = "";
  project = "";
  Permission = [];
  menus = [];
  path: any = "";
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild("trigger") customTrigger: TemplateRef<void>;

  constructor(private location: Location, private router: Router) {
    this.project = app;
    this.name = userinfo["name"] || "明治";
    const data = userinfo.permission;
    data.forEach(item => {
      if (item.pid === 0) {
        let obj = {};
        obj["name"] = item["name"];
        obj["url"] = URL[item["display_name"]];
        obj["icon"] = ICON[item["display_name"]];
        if (item.display_name === 'system_setting') {
          let ary = [];
          data.forEach(_item => {
            if (item.id === _item.pid) {
              ary.push({
                name: _item.name,
                url: URL[_item.display_name],
                icon: ICON[_item.display_name]
              });
            }
          });
          obj["children"] = ary;
        } else {
          let o = {};
          data.forEach(_item => {
            if (item.id === _item.pid) {
              o[_item["display_name"]] = true;
            }
          });
          FN[item["display_name"]] = o;
        }
        this.menus.push(obj);
      }
    });
  }

  ngOnInit() { }

  activate(e) {
    this.path = this.location.path();
    let data = userinfo.permission;
    let name;
    for (let key in URL) {
      if (URL[key] == this.path) {
        name = key;
      }
    }
    if (name) {
      let a = data.find(item => item.display_name == name);
      if (!a) {
        this.router.navigateByUrl('/notfound');
      }
    } else {
      this.router.navigateByUrl('/notfound');
    }
  }

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }
}
