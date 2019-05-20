import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { userinfo, app, URL, ICON, FN } from "@core/store";
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

  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild("trigger") customTrigger: TemplateRef<void>;

  constructor(private location: Location) {
    this.project = app;
    this.name = userinfo["name"] || "明治";
    console.log(userinfo);
    const data = userinfo.permission;
    data.forEach(item => {
      if (item.pid === 0) {
        let obj = {};
        obj["name"] = item["display_name"];
        obj["url"] = URL[item["name"]];
        obj["icon"] = ICON[item["name"]];
        if (item.id === 23) {
          let ary = [];
          data.forEach(_item => {
            if (item.id === _item.pid) {
              ary.push({
                name: _item.display_name,
                url: URL[_item.name],
                icon: ICON[_item.name]
              });
            }
          });
          obj["children"] = ary;
        } else {
          let o = {};
          data.forEach(_item => {
            if (item.id === _item.pid) {
              o[_item["name"]] = true;
            }
          });
          FN[item["name"]] = o;
        }
        this.menus.push(obj);
      }
    });
    console.log(this.menus);
  }

  ngOnInit() {}

  activate(e) {
    console.log(e);
  }

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}
