import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { AddRangeComponent } from "../add-range/add-range.component";

@Component({
  selector: "app-range",
  templateUrl: "./range.component.html",
  styleUrls: ["./range.component.css"]
})
export class RangeComponent implements OnInit {
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
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    this.loading = true;
    this.http.post("api/manager/mutual_range_list", {}).subscribe(
      res => {
        this.loading = false;
        if (res["status"] === 200) {
          let data = res["data"];
          this.data = [...data];
          this.total = this.data.length;
        }
      },
      err => {
        this.loading = false;
      }
    );
  }

  show_modal(data?: any) {
    let modal;
    if (data) {
      modal = this.modalService.create({
        nzTitle: "编辑互助范围",
        nzContent: AddRangeComponent,
        nzComponentParams: {
          id: data.id,
          name: data.name
        },
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: 600
      });
    } else {
      modal = this.modalService.create({
        nzTitle: "添加互助范围",
        nzContent: AddRangeComponent,
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: 600
      });
    }
    modal.afterClose.subscribe(res => {
      if (res) {
        this.get_data();
      }
    });
  }

  delete_range(id) {
    this.http.post("api/manager/delete_mutual_range", { id }).subscribe(res => {
      if (res["status"] === 200) {
        this.messageService.success("删除成功！");
        this.get_data();
      }
    });
  }

  cancel() { }
}
