import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { FN } from "@core/store";
@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.css"]
})
export class ManagerComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 16;
  pagesizeAry = [16, 32, 48];
  loading = false;
  total = 0;

  fn = {};
  constructor(
    private modalService: NzModalService,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {}
}
