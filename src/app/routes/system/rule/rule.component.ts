import { Component, OnInit, ElementRef, AfterViewInit } from "@angular/core";
import * as wangEditor from "wangeditor";
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd";
import { environment } from "@env/environment";

@Component({
  selector: "app-rule",
  templateUrl: "./rule.component.html",
  styleUrls: ["./rule.component.css"]
})
export class RuleComponent implements OnInit, AfterViewInit {
  editor;
  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private messageService: NzMessageService
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.http.post("api/manager/convention_rules_info", {}).subscribe(res => {
      if (res["status"] === 200) {
        let editorDom = this.el.nativeElement.querySelector("#rule");
        this.editor = new wangEditor(editorDom);
        this.editor.customConfig.uploadImgServer =
          environment.api + "/ucs/upload_img";
        this.editor.customConfig.uploadFileName = "img_path";
        this.editor.customConfig.uploadImgHooks = {
          success: (xhr, editor, result) => {
            this.messageService.success('图片上传成功')
          },
          customInsert: (insertImg, result, editor) => {

            let path = result["result"];
            insertImg(environment.api + '/__images/' + path);
          }
        };
        this.editor.create();
        this.editor.txt.html(res["result"]);
      }
    });
  }

  edit() {
    let contents = this.editor.txt.html();
    this.http
      .post("api/manager/edit_convention_rules", { contents })
      .subscribe(res => {
        if (res["status"] === 200) {
          this.messageService.success("修改成功！");
        }
      });
  }
}
