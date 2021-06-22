import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.css']
})
export class BatchDetailComponent implements OnInit {
  data = [];
  page = 1;
  pagesize = 15;
  max = 1;
  total = 0
  search_str: any = '';
  loading = false;
  @Input() id: any;
  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    console.log(this.id);
    this.get_data();
  }

  get_data() {
    let params = {
      page: this.page,
      pagesize:this.pagesize,
      id: this.id,
      search_str: this.search_str
    };
    this.loading = true;
    this.http.post('api/manager/batch_flowers_info', params).subscribe(res => {
      this.loading = false;
      if (res['status'] === 200) {
        res = res['result'];
        this.data = res['data'];
        this.pagesize = res['per_page'];
        this.total = res['total'];
        this.max = res['last_page'];
      }
    })
  }

  search_data(flag?: boolean) {
    if (flag) {
      this.page = 1;
    }
    this.get_data();
  }

  clear_data() {
    this.search_str = '';
    this.search_data(true);
  }

}
