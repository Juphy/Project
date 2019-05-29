import {
  Component,
  OnInit,
  ElementRef,
  Input,
  AfterViewInit
} from "@angular/core";
import * as wangEditor from "wangeditor";
import { HttpClient } from "@angular/common/http";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
import { siteinfo } from "@core/store";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit, AfterViewInit {
  private editor: any;
  title: any;
  description: any;
  content: any;
  loading = false;
  option;
  msgs = {
    1: "添加文章成功！",
    2: "编辑文章成功！"
  };
  optionObj = {};
  @Input() data: any;
  @Input() options: any = [];
  @Input() type: any; // 1 创建  2 编辑
  constructor(
    private el: ElementRef,
    private nzModalRef: NzModalRef,
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.options.forEach(item => {
      this.optionObj[item.c_id] = item["c_name"];
    });
    if (this.data) {
      this.title = this.data["title"];
      this.description = this.data["description"];
      this.content = this.data["content"];
      this.option = this.data["c_id"];
    }
  }

  ngAfterViewInit(): void {
    let editorDom = this.el.nativeElement.querySelector("#editorElem");
    this.editor = new wangEditor(editorDom);
    this.editor.customConfig.uploadImgServer =
      siteinfo.api + "/api/upload_file";
    this.editor.customConfig.uploadFileName = "photo";
    this.editor.customConfig.uploadImgHooks = {
      success: (xhr, editor, result) => {
        this.messageService.success('图片上传成功')
      },
      customInsert: (insertImg, result, editor) => {

        let path = result["data"];
        insertImg(siteinfo.ucs + path);
      }
    };
    this.editor.create();
    this.editor.txt.html(this.content);
  }

  done() {
    let contents = this.editor.txt.html();
    this.loading = true;
    let params = {
      title: this.title,
      description: this.description,
      contents,
      c_id: this.option,
      c_name: this.optionObj[this.option]
    };
    if (this.type === 2) {
      params["id"] = this.data["id"];
    }
    this.http.post("api/news/add_news", params).subscribe(
      res => {
        this.loading = false;
        if (res["status"] === 200) {
          this.messageService.success(this.msgs[this.type]);
          this.nzModalRef.destroy(true);
        }
      },
      err => {
        this.loading = false;
      }
    );
  }

  cancel() {
    this.nzModalRef.destroy(false);
  }
}
