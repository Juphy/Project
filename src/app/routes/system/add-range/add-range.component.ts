import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
@Component({
  selector: 'app-add-range',
  templateUrl: './add-range.component.html',
  styleUrls: ['./add-range.component.scss']
})
export class AddRangeComponent implements OnInit {
  @Input() name = '';
  @Input() id: any;
  constructor(
    private nzModalRef: NzModalRef,
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
  }

  edit_range() {
    let params = {
      name: this.name
    };
    if (this.id) {
      params['id'] = this.id;
      this.http.post('api/manager/edit_mutual_range', params).subscribe(res => {
        if (res['status'] === 200) {
          this.messageService.success('添加成功！');
          this.nzModalRef.destroy(true);
        }
      })
    } else {
      this.http.post('api/manager/add_mutual_range', params).subscribe(res => {
        if (res['status'] === 200) {
          this.messageService.success('添加成功！');
          this.nzModalRef.destroy(true);
        }
      })
    }
  }

  cancel() {
    this.nzModalRef.destroy(false);
  }
}
