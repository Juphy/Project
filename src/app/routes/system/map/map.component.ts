import { AddMapComponent } from "./../add-map/add-map.component";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 16;
  pagesizeAry = [16, 32, 48];
  loading = false;
  total = 0;
  constructor(
    private modalService: NzModalService,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    this.loading = true;
    this.http.post("api/news/lists", params).subscribe(
      res => {
        this.loading = false;
        if (res["status"] === 200) {
          let data = res["data"];
          this.data = data["data"];
          this.total = data["total"];
        }
      },
      error => {
        this.loading = false;
      }
    );
  }

  search_data(flag?: boolean) {
    if (flag) {
      this.page = 1;
    }
    this.get_data();
  }

  clear_data() {
    this.search_data(true);
  }

  show_modal() {
    let modal = this.modalService.create({
      nzTitle: "添加图片",
      nzContent: AddMapComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1000
    });

    modal.afterClose.subscribe(res => {
      if (res) {
        this.search_data();
      }
    });
  }
}
