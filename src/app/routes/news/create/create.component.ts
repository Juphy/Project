import {
  Component,
  OnInit,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import * as wangEditor from "wangeditor";
import { HttpClient } from "@angular/common/http";
import { NzModalRef, NzMessageService } from "ng-zorro-antd";
import { environment } from "@env/environment";

// import { UEditorComponent } from "ngx-ueditor";
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
  ueditor_config = {
    toolbars: [
      [
        "FullScreen", // 全屏
        "bold", // 加粗
        "italic", // 斜体
        "underline", // 下划线
        "|",
        "forecolor", // 字体颜色
        "backcolor", // 背景色
        "fontfamily", // 字体
        "fontsize", // 字号
        "|",
        "insertorderedlist", // 有序列表
        "insertunorderedlist", // 无序列表
        "|",
        "justifyleft", // 左对齐
        "justifycenter", // 居中对齐
        "justifyright", // 右对齐
        "justifyjustify", // 两端对齐
        "|",
        "link", // 超链接
        "unlink", // 取消链接
        "inserttable", // 插入表格
        "|",
        "simpleupload" // 单图上传
      ]
    ],
    autoClearinitialContent: true, // 自动清除初始内容
    wordCount: true, // 文字计数
    focus: false, // 初始化后获得焦点
    initialFrameHeight: 200, // 设置高度
    initialFrameWidth: "100%", // 设置宽度
    enableDragUpload: true, // 启用拖放上传
    enablePasteUpload: true, // 启用粘贴上传
    imageScaleEnabled: true, // 启用图片拉伸缩放
    autoHeightEnabled: true // 自动高度
  };
  @Input() data: any;
  @Input() options: any = [];
  @Input() type: any; // 1 创建  2

  // @ViewChild("ueditor") ueditor: UEditorComponent;
  html: string;
  constructor(
    private el: ElementRef,
    private nzModalRef: NzModalRef,
    private http: HttpClient,
    private messageService: NzMessageService
  ) {}

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
    // this.html = `<h1>测试</h1>`;
  }

  ngAfterViewInit(): void {
    let editorDom = this.el.nativeElement.querySelector("#editorElem");
    this.editor = new wangEditor(editorDom);
    this.editor.customConfig.pasteFilterStyle = false;
    this.editor.customConfig.pasteIgnoreImg = false;
    this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024
    this.editor.customConfig.linkImgCallback = function(url){
      console.log(url);
    }
    this.editor.customConfig.uploadImgServer =
      environment.api + "/ucs/upload_img";
    this.editor.customConfig.uploadFileName = "img_path";
    this.editor.customConfig.uploadImgHooks = {
      success: (xhr, editor, result) => {
        this.messageService.success("图片上传成功");
      },
      customInsert: (insertImg, result, editor) => {
        let path = result["result"];
        insertImg(environment.api + '/__images/' + path);
      }
    };
    this.editor.create();
    this.editor.txt.html(this.content);
  }

  done() {
    let contents = this.editor.txt.html();
    // let contents = this.ueditor.Instance.getContent();
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
