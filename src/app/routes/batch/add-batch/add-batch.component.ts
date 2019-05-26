import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit {
  current = 0;
  DATA = [];
  data = [];
  allChecked = false;
  isIndeterminate = false;
  ids: { [key: string]: boolean } = {};
  page = 1;
  total = 0;
  loading = false;
  constructor(
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService,
    private http: HttpClient,
  ) { }

  check_all(flag: boolean) {
    this.data.forEach(item => (this.ids[item.id] = flag));
    this.refresh_status();
  }

  refresh_status() {
    this.allChecked = this.data.every(item => this.ids[item.id]);
    this.isIndeterminate = this.data.some(item => this.ids[item.id]) && !this.allChecked;

  }

  ngOnInit() {

  }

  get_data(){
    // this.http.post('')
  }

  change_current(value) {
    this.current = value;
  }

  done() {

  }

  cancel() {
    this.nzModalRef.destroy(false);
  }

}
