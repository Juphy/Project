import { AddMapComponent } from "./../add-map/add-map.component";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { siteinfo } from "@core/store";
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
  statusObj = {
    0: "未上架",
    1: "已上架"
  };
  UCS = siteinfo.ucs;
  constructor(
    private modalService: NzModalService,
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    this.loading = true;
    this.http.post("api/manager/carousel_map_list", {}).subscribe(
      res => {
        this.loading = false;
        if (res["status"] === 200) {
          let data = res["data"];
          this.data = [...data];
          this.total = this.data.length;
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

  show_modal(flag?: boolean, data?: any) {
    let modal;
    if (flag) {
      modal = this.modalService.create({
        nzTitle: "编辑图片",
        nzContent: AddMapComponent,
        nzComponentParams: {
          title: data.title,
          image_name: data.image_name,
          link: data.link,
          id: data.id
        },
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: 1000
      });
    } else {
      modal = this.modalService.create({
        nzTitle: "添加图片",
        nzContent: AddMapComponent,
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: 1000
      });
    }
    modal.afterClose.subscribe(res => {
      if (res) {
        this.search_data();
      }
    });
  }

  change_status(id, status) {
    this.http
      .post("api/manager/up_carousel_map", { id, status })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.messageService.success("操作成功");
          this.get_data();
        }
      });
  }

  cancel() { }

  delete_image(id) {
    this.http.post("api/manager/delete_carousel_map", { id }).subscribe(res => {
      if (res["status"] === 200) {
        this.messageService.success("删除成功！");
        this.get_data();
      }
    });
  }
}
