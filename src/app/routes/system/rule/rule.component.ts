import { Component, OnInit, ElementRef, AfterViewInit } from "@angular/core";
import * as wangEditor from "wangeditor";
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd";
import { siteinfo } from "@core/store";

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
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.http.post("api/manager/convention_rules_info", {}).subscribe(res => {
      if (res["status"] === 200) {
        let editorDom = this.el.nativeElement.querySelector("#rule");
        this.editor = new wangEditor(editorDom);
        this.editor.customConfig.uploadImgServer =
          siteinfo.api + "/api/upload_file";
        this.editor.customConfig.uploadFileName = "photo";
        this.editor.customConfig.uploadImgHooks = {
          success: (xhr, editor, result) => {
            console.log(result);
          },
          customInsert: (insertImg, result, editor) => {
            console.log(result);
            let path = result["data"];
            insertImg(siteinfo.ucs + path);
          }
        };
        this.editor.create();
        this.editor.txt.html(res["data"]);
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
