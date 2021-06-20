import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { CreateComponent } from "./create/create.component";
@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"]
})
export class NewsComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 15;
  loading = false;
  total = 0;
  title;
  c_id;
  options = [];
  statusObj = {
    0: "未发布",
    1: "已发布"
  };
  max = 1;
  constructor(
    private modalService: NzModalService,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {
    this.get_types();
  }

  get_types() {
    this.http
      .post("api/get_options", { option_type: "news_type" })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.options = [];
          let data = res["data"];
          for (let key in data) {
            this.options.push({
              c_id: Number(key),
              c_name: data[key]
            });
          }
        }
      });
  }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {
      page: this.page,
      pagesize: this.pagesize
    };
    if (this.c_id) {
      params["c_ids"] = [this.c_id];
    }
    if (this.title) {
      params["title"] = this.title;
    }
    this.loading = true;
    this.http.post("api/news/lists", params).subscribe(
      res => {
        this.loading = false;
        if (res["status"] === 200) {
          res = res['result'];
          this.data = res['data'] || [];
          this.total = res['pageinfo']["total"] || 0;
          this.pagesize = res['pageinfo']['per_page'] || 15;
          this.max = res['pageinfo']['last_page'] || 1;
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
    this.title = "";
    this.c_id = null;
    this.search_data(true);
  }

  show_modal(flag?: boolean, data?: any) {
    let modal;
    if (flag) {
      modal = this.modalService.create({
        nzTitle: "编辑文章",
        nzContent: CreateComponent,
        nzFooter: null,
        nzComponentParams: {
          type: 2,
          options: this.options,
          data: data
        },
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: 1000
      });
    } else {
      modal = this.modalService.create({
        nzTitle: "添加文章",
        nzContent: CreateComponent,
        nzFooter: null,
        nzComponentParams: {
          type: 1,
          options: this.options
        },
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

  delete_news(id) {
    this.http.post("api/news/del_news", { id }).subscribe(res => {
      if (res["status"] === 200) {
        this.messageService.success("删除文章成功！");
        this.search_data();
      }
    });
  }

  release_news(id) {
    this.http.post("api/news/release_news", { id }).subscribe(res => {
      if (res["status"] === 200) {
        this.messageService.success("发布文章成功！");
        this.search_data();
      }
    });
  }
  down_news(id){
    this.http.post('api/news/down_news', {id}).subscribe(res =>{
      if(res['status'] === 200){
        this.messageService.success('下架文章成功！');
        this.search_data();
      }
    })
  }
  cancel() {

  }
}
