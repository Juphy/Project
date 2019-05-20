import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { userinfo } from "@core/store";
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  name='';
  Permission=[];
  constructor(private location: Location) {}

  ngOnInit() {}

  activate(e) {
    console.log(e);
  }
}
